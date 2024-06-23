const db = require("../../../models/index");
const ProcurementPODetails = db.procurement_po_details;
const Procurement_POItemDetails = db.procurement_po_items;
const Procurement_POServiceDetails = db.procurement_po_services;
const Approved_POlevelDetails = db.procurement_po_Approved_level;
const Department = db.department;
const workFlow = db.Work_Flow;
const workFlowRange = db.workflowrange;
const workFlowMap = db.workflowmap;
const userDetails = db.user;
const Budget = db.tbl_budget;
const PO_log_details = db.po_log_details;
const Procurement_Details = db.procurement;

const { Op, where } = require("sequelize");

////////////////////////create api //////////////////////////
exports.Create_PO_request = async (req, res) => {
    try {
        const {
            employee_id, department_name, delivery_branch, po_type, po_supplier_vendor_name, po_date, po_number, po_remark, item_detail, service_detail, po_category_type, total, branch_id, financial_year
        } = req.body;

        var file = req.files.po_attached_doc ? req.files.po_attached_doc[0].path : "";
        const newFile = file.replace(/\\/g, "/");
        var Item_Detail = item_detail ? JSON.parse(item_detail) : null;
        var Service_Detail = service_detail ? JSON.parse(service_detail) : null;

        const departmentInfo = await Department.findOne({
            where: { department_name: req.body.department_name, isDeleted: false, status: "ACTIVE" },
            attributes: ["dept_id", "department_name"],
        });
        if (!departmentInfo) {
            return res
                .status(500)
                .send({ code: 500, message: "Department not found!" });
        }

        const getData = await workFlow.findOne({
            where: {
                workflow_department: departmentInfo.dept_id,
                workflow_type: po_category_type,
            },
            attributes: ["workflow_id"],
        });

        if (!getData || getData.length === 0) {
            return res.status(500).send({
                code: 500,
                message: "Workflow is not created for required department And PO!",
            });
        }
        else {
            const response = await ProcurementPODetails.create({
                department_name, po_number, employee_id, delivery_branch, po_type, po_supplier_vendor_name, po_date, po_remark, po_category_type, total, branch_id, financial_year, po_attached_doc: newFile,
            });

            let itemPromises = [];
            let servicePromises = [];

            if (po_category_type === "Item PO") {
                if (Array.isArray(Item_Detail) && Item_Detail.length > 0) {
                    itemPromises = Item_Detail.map(async (data) => {
                        const item_details = {
                            department: response.department_name,
                            item_id: data.item_id,
                            po_id: response.id,
                            po_category_type: response.po_category_type,
                            employee_id: req.body.employee_id,
                            item_quantity: data.item_quantity,
                            unit_price: data.unit_price,
                            amount: data.amount,
                            tax: data.tax,
                            asset_category_id: data.asset_category_id,
                        };
                        try {
                            let result = await Procurement_POItemDetails.create(
                                item_details
                            );
                            console.log("Item Created Successfully:", result);
                            return result;
                        } catch (error) {
                            console.error("Item Creation Error:", error);
                            throw error;
                        }
                    });
                } else {
                    console.log("No valid Item details found");
                }
            } else if (po_category_type === "Service PO") {
                if (Array.isArray(Service_Detail) && Service_Detail.length > 0) {
                    servicePromises = Service_Detail.map(async (data) => {
                        const service_details = {
                            department: response.department_name,
                            service_id: data.service_id,
                            po_id: response.id,
                            po_category_type: response.po_category_type,
                            employee_id: response.employee_id,
                            service_quantity: data.service_quantity,
                            unit_price: data.unit_price,
                            amount: data.amount,
                            tax: data.tax,
                            service_category_id: data.service_category_id,
                        };

                        try {
                            result = Procurement_POServiceDetails.create(service_details);
                            console.log("Service Created Successfully:", result);
                            return result;
                        } catch (error) {
                            console.error("Service Creation Error:", error);
                            throw error;
                        }
                    });
                } else {
                    console.log("No valid Service details found");
                }
            }

            const itemResults = await Promise.all(itemPromises);
            const serviceResults = await Promise.all(servicePromises);

            const Depart_detail = await Department.findOne({ where: { department_name: department_name } });
            const Budget_Details = await Budget.findOne({ where: { department_id: Depart_detail.dept_id, type: po_type, financial_year_id: financial_year, isDeleted: false } });

            const total_budget = Budget_Details.amount;
            const Total_Remaining_budget = Budget_Details.remainingAmount;
            const remainingAmount = Total_Remaining_budget - total;

            if (Total_Remaining_budget > total) {
                const budget_Update = await Budget.update({ remainingAmount: remainingAmount }, { where: { department_id: Depart_detail.dept_id, type: po_type, financial_year_id: financial_year, isDeleted: false } });

                const budget_create = await PO_log_details.create({
                    department_name: department_name,
                    po_id: response.id,
                    created_by: employee_id,
                    po_type,
                    total_budget: total_budget,
                    total_purchase: total,
                    Total_Remaining_budget: Total_Remaining_budget,
                    remaining_budget: remainingAmount
                });
                if (!budget_create && !budget_Update) {
                    return res.status(404).send({
                        code: 404, message: "Unable to update Budget",
                    });
                }
            } else {
                return res.status(200).send({ code: 200, message: "Your Balance is Low" });
            }

            const getRole = await workFlowMap.findOne({
                where: {
                    workflowId: getData.workflow_id,
                },
                attributes: ["workflow_roleId", "workflow_employeeId", "workflowId"],
            });

            const getLevels = await workFlowRange.findAll({
                where: {
                    workFlow_id: getRole.workflowId,
                    status: 'ACTIVE'
                },
                attributes: [
                    "level",
                    "workflowrange_employeeId",
                    "progress_Status",
                    "id",
                ],
            });

            const levelPromises = getLevels.map(async (level) => {
                const createdLevel = await Approved_POlevelDetails.create({
                    level: level.level,
                    po_id: response.id,
                    employee_id: level.workflowrange_employeeId,
                    workflow_range_id: level.id,
                });

                return createdLevel;
            });

            const levelResults = await Promise.all(levelPromises);

            return res.status(200).send({
                code: 200,
                message: "Created Successfully!",
                data: response,
                itemResults,
                serviceResults,
            });
        }
    } catch (error) {
        console.error("Main Error:", error);
        return res.status(500).send({
            code: 500,
            message: error.message || "Server Error",
            error: error.stack,
        });
    }
}

exports.generate_Po_No = async (req, res) => {
    try {
        const po_type = req.body.po_type;
        const po_Variable = "PO";
        const lastEntry = await ProcurementPODetails.findAll({
            where: { status: "ACTIVE" },
            order: [['createdAt', 'DESC']],
            attributes: ["po_number", "id"]
        });

        if (!lastEntry.length == 0) {
            const last_digit = lastEntry[0].po_number
            if (last_digit) {
                const lastNumber = parseInt(last_digit.slice(-2), 6);
                var number = lastNumber + 1;
            } else if (last_digit.length == 0 || last_digit.length == null) {
                var number = 1;
            }
        } else {
            var number = 1;
        }
        const code = `${number}`.padStart(3, '0');
        const po_number2 = po_Variable + `${number}`.padStart(3, '0');
        const po_number = po_Variable + code;
        if (po_type === "") {
            return res.status(200).send({ code: 200, message: "Please Select PO Type", data: null });
        } else if (po_type === "Capex") {
            return res.status(200).send({ code: 200, message: "PO Number for Capex Purchase Order has been Generated", data: po_number2 });
        }
        else if (po_type === "Opex") {
            return res.status(200).send({ code: 200, message: "PO Number for Opex Purchase Order has been Generated", data: po_number2 });
        } else {
            return res.status(200).send({ code: 200, message: "PO Number has been Generated Purchase Order", data: po_number });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
}

exports.get_all_po = async (req, res) => {
    try {
        const loggedEmployeeId = req.body.emp_id;
        const loggedUserRole = req.body.loggedUserRole;

        let getAllData;

        if (loggedUserRole === "Super Admin") {
            const query = `SELECT * FROM procurement_po_details AS pp WHERE pp.status ='ACTIVE' ORDER BY pp.id DESC`;

            getAllData = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
        } else {
            const query = `SELECT * FROM procurement_po_details AS pp 
            WHERE pp.employee_id = ${loggedEmployeeId} and pp.status='ACTIVE' ORDER BY pp.id DESC `;

            getAllData = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
        }

        if (getAllData.length > 0) {
            return res.status(200).send({
                code: 200,
                message: "Fetch All Data Successfully",
                data: getAllData,
            });
        } else {
            return res.status(200).send({ code: 200, message: "No Records Found", data: getAllData });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.get_to_be_approved_po = async (req, res) => {
    try {
        const loggedEmployeeId = req.params.emp_id;

        const query = `SELECT * FROM procurement_po_details AS pp 
      LEFT JOIN procurement_po_approvel_level as la ON la.po_id=pp.id and la.employee_id= ${loggedEmployeeId} WHERE la.Approvel_status='PENDING' and pp.approvel_status!='PUSH BACK' and pp.id IN (
          SELECT pa.po_id FROM procurement_po_approvel_level AS pa 
          WHERE pa.employee_id = ${loggedEmployeeId} 
          AND (
              (pa.level = 1)
              OR 
              (
                  pa.level > 1 
                  AND 
                  (
                      SELECT COUNT(pl.id) 
                      FROM procurement_po_approvel_level AS pl 
                      WHERE pl.po_id = pa.po_id 
                      AND pl.level = (pa.level - 1)  
                      AND pl.Approvel_status = 'APPROVED' 
                      AND pl.progressStatus = 'CLOSE'
                  ) > 0
              )
          )
      );
  `;
        const data = await db.sequelize.query(query, {
            type: db.sequelize.QueryTypes.SELECT,
        });
        return res.status(200).json({ code: 200, message: "Success", data: data });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.approved_po_ByPO_ID = async (req, res) => {
    try {
        const po_id = req.params.po_id;
        const {
            remarks, emp_id, Approvel_status, progressStatus
        } = req.body;
        let updateData;

        if (Approvel_status == 'PUSH BACK') {
            const updateDetailsQuery = `UPDATE procurement_po_details as pd SET pd.approvel_status='PUSH BACK', pd.po_remark ='${remarks}' WHERE pd.id = ${po_id}`;

            const updateApprovelQuery = `UPDATE procurement_po_approvel_level as pl SET pl.Approvel_status ='PUSH BACK', pl.progressStatus ='OPEN', pl.Approver_remarks ='${remarks}' WHERE pl.employee_id = ${emp_id} AND pl.po_id = ${po_id}`;

            await db.sequelize.query(updateDetailsQuery, {
                type: db.sequelize.QueryTypes.UPDATE,
            });

            await db.sequelize.query(updateApprovelQuery, {
                type: db.sequelize.QueryTypes.UPDATE,
            });

            updateData = 'PUSH BACK';
        } else if (Approvel_status == 'REJECTED') {

            const Po_detail = await ProcurementPODetails.findOne({ where: { id: po_id } });
            await ProcurementPODetails.update({ po_status: 'UNPAID', approvel_status: 'REJECTED' }, { where: { id: po_id } });
            const Depart_detail = await Department.findOne({ where: { department_name: Po_detail.department_name } });
            const Budget_Details = await Budget.findOne({ where: { department_id: Depart_detail.dept_id, financial_year_id: Po_detail.financial_year, type: Po_detail.po_type, isDeleted: false } });

            const Total_Remaining_budget = Budget_Details.remainingAmount;
            const remainingAmount = Total_Remaining_budget + Po_detail.total;

            if (!Total_Remaining_budget == 0 && !Po_detail.total == 0) {
                const budget_Update = await Budget.update({ remainingAmount: remainingAmount }, { where: { id: Budget_Details.id } });
                if (!budget_Update) {
                    return res.status(404).send({
                        code: 404, message: "Unable to update Budget",
                    });
                }
            } else {
                return res.status(404).send({ code: 404, message: "Your Remaining Amount is Not Found" });
            }

            updateData = await Approved_POlevelDetails.update(
                {
                    Approvel_status: Approvel_status,
                    progressStatus: progressStatus,
                    Approver_remarks: remarks
                },
                {
                    where: {
                        employee_id: emp_id,
                        po_id: po_id
                    },
                }
            );

        } else {
            updateData = await Approved_POlevelDetails.update(
                {
                    Approvel_status: Approvel_status,
                    progressStatus: progressStatus,
                    Approver_remarks: remarks
                },
                {
                    where: {
                        employee_id: emp_id,
                        po_id: po_id
                    },
                }
            );
        }

        if (Approvel_status == 'APPROVED') {
            const allLevelsData = await Approved_POlevelDetails.findAll({
                where: {
                    employee_id: emp_id,
                    po_id: po_id
                },
                order: [["level", "ASC"]],
            });

            let maxLevel;
            if (allLevelsData !== null) {
                maxLevel = await Approved_POlevelDetails.max("level");
            }

            const currentLevel = await Approved_POlevelDetails.findOne({
                attributes: ["level"],
                where: {
                    employee_id: emp_id,
                    po_id: po_id
                },
            });

            const maxLevelValue = maxLevel !== null ? maxLevel : null;
            const currentLevelValue = currentLevel
                ? currentLevel.level
                : null;

            if (maxLevelValue !== null && currentLevelValue !== null && currentLevelValue === maxLevelValue) {
                const currentApprovelStatus = await ProcurementPODetails.findOne({
                    attributes: ["approvel_status"],
                    where: { id: po_id },
                });

                if (currentApprovelStatus !== null && currentApprovelStatus.approvel_status !== Approvel_status) {
                    const finalApproved = await ProcurementPODetails.update(
                        { approvel_status: Approvel_status },
                        { where: { id: po_id } }
                    );

                    return res.status(200).send({
                        code: 200,
                        message: "PO Approved Successfully. This One must be the last level.",
                        data: finalApproved,
                    });
                }
            }
        }

        if (updateData !== 0 && updateData !== 'PUSH BACK') {
            return res.status(200).send({
                code: 200,
                message: "PO Approval Successfully",
                data: updateData,
            });
        } else if (updateData === 'PUSH BACK') {
            return res.status(200).send({
                code: 200,
                message: "PO Pushed Back Successfully",
                data: updateData,
            });
        } else {
            return res.status(200).send({ code: 200, message: "Unable to Update", data: updateData });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.getAll_draft_po = async (req, res) => {
    try {
        const loggedEmployeeId = req.body.emp_id;
        const loggedUserRole = req.body.loggedUserRole;

        let getAllData;

        if (loggedUserRole === "Super Admin") {
            const query = `SELECT * FROM procurement_po_details AS pp WHERE pp.status ='ACTIVE' and pp.approvel_status ='PUSH BACK'`;

            getAllData = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
        } else {
            const query = `SELECT * FROM procurement_po_details AS pp 
            WHERE pp.employee_id = ${loggedEmployeeId} AND pp.approvel_status = 'PUSH BACK' AND pp.status='ACTIVE' `;

            getAllData = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
        }

        if (getAllData.length > 0) {
            return res.status(200).send({
                code: 200,
                message: "Fetch All Data Successfully",
                data: getAllData,
            });
        } else {
            return res.status(200).send({ code: 200, message: "No Records Found", data: getAllData });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.get_all_Approved_PO = async (req, res) => {
    try {
        const loggedEmployeeId = req.body.emp_id;
        const loggedUserRole = req.body.loggedUserRole;

        let getAllData;

        if (loggedUserRole === "Super Admin") {
            const query = `SELECT * FROM procurement_po_details AS pp WHERE pp.status ='ACTIVE' AND pp.approvel_status = 'APPROVED' ORDER BY pp.id DESC `;

            getAllData = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
        } else {
            const query = `SELECT * FROM procurement_po_details AS pp 
            INNER JOIN procurement_po_approvel_level AS la ON la.po_id = pp.id 
            WHERE la.employee_id = ${loggedEmployeeId} AND la.Approvel_status = 'APPROVED' AND la.progressStatus='CLOSE' ORDER BY pp.id DESC `;

            getAllData = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
        }

        if (getAllData.length > 0) {
            return res.status(200).send({
                code: 200,
                message: "Fetch All Data Successfully",
                data: getAllData,
            });
        } else {
            return res.status(200).send({ code: 200, message: "No Records Found", data: getAllData });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.get_all_Rejected_PO = async (req, res) => {
    try {
        const loggedEmployeeId = req.body.emp_id;
        const loggedUserRole = req.body.loggedUserRole;

        let getAllData;

        if (loggedUserRole === "Super Admin") {
            const query = `SELECT * FROM procurement_po_details AS pp WHERE pp.status ='ACTIVE' AND pp.approvel_status = 'REJECTED' ORDER BY pp.id DESC `;

            getAllData = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
        } else {
            const query = `SELECT * FROM procurement_po_details AS pp 
            INNER JOIN procurement_po_approvel_level AS la ON la.po_id = pp.id 
            WHERE la.employee_id = ${loggedEmployeeId} AND la.Approvel_status = 'REJECTED' AND la.progressStatus='CLOSE' ORDER BY pp.id DESC `;

            getAllData = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
        }

        if (getAllData.length > 0) {
            return res.status(200).send({
                code: 200,
                message: "Fetch All Data Successfully",
                data: getAllData,
            });
        } else {
            return res.status(200).send({ code: 200, message: "No Records Found", data: getAllData });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.getAll_PO_Approval_level = async (req, res) => {
    try {
        const po_id = req.params.po_id;

        const getData = await Approved_POlevelDetails.findAll({
            where: {
                [Op.and]: [
                    { po_id: po_id },
                ],
            },
            attributes: ["Approvel_status", "level", "employee_id"],
        });

        if (!getData || getData.length === 0) {
            return res.status(400).send({ code: 400, message: "Data not found" });
        }

        const levelsWithNames = [];
        for (const levelInfo of getData) {
            const employeeInfo = await userDetails.findOne({
                where: {
                    employee_id: levelInfo.employee_id,
                },
                attributes: ["first_name", "last_name"],
            });

            if (!employeeInfo) {
                return res.status(400).send({
                    code: 400,
                    message: "User not found for level " + levelInfo.level,
                });
            }

            const fullName = `${employeeInfo.first_name} ${employeeInfo.last_name}`;
            const levelWithName = {
                level: levelInfo.level,
                name: fullName,
                status: levelInfo.Approvel_status,
            };
            levelsWithNames.push(levelWithName);
        }

        return res.status(200).send({
            code: 200,
            message: "Data Fetched Successfully!",
            data: levelsWithNames,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.get_po_Byid = async (req, res) => {
    try {
        const po_id = req.params.po_id;
        const { po_type, financial_year } = req.body;

        let getData;
        if (po_type == 'Item PO') {
            getData = await ProcurementPODetails.findAll({
                where: { id: po_id },
                include: [
                    {
                        model: Procurement_POItemDetails,
                        include:
                        {
                            model: db.ItemMaster,
                            attributes: ['item_name', 'item_code', 'item_document']
                        },
                    },
                    {
                        model: db.tbl_branch,
                        attributes: ['branch_name', 'branch_code', 'branch_gstnumber', 'branch_address']
                    },
                ]
            });
        } else {
            getData = await ProcurementPODetails.findAll({
                where: { id: po_id },
                include: [
                    {
                        model: Procurement_POServiceDetails,
                        include:
                        {
                            model: db.Service_master,
                            attributes: ['service_name', 'service_code', 'service_document']
                        },
                    },
                    {
                        model: db.tbl_branch,
                        attributes: ['branch_name', 'branch_code', 'branch_gstnumber', 'branch_address']
                    },
                ]
            });
        }
        if (getData) {
            return res.status(200).send({ code: 200, message: "Get Data Succssesfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found", data: getData });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.update_draft_po = async (req, res) => {
    try {
        const po_id = req.params.po_id;
        const {
            budget_id, employee_id, delivery_branch, po_supplier_vendor_name, total, po_remark, po_category_type, service_detail, item_detail
        } = req.body;

        var Item_Detail = item_detail ? JSON.parse(item_detail) : null;
        var Service_Detail = service_detail ? JSON.parse(service_detail) : null;

        const Po_detail = await ProcurementPODetails.findOne({ where: { id: po_id } });
        const Budget_Details = await Budget.findOne({ where: { id: budget_id } });

        const Total_Remaining_budget = Budget_Details.remainingAmount;
        const remainingAmount = Total_Remaining_budget + Po_detail.total;
        const remainingAmountMinus = remainingAmount - total;

        if (!Total_Remaining_budget == 0 && !Po_detail.total == 0) {
            const budget_Update = await Budget.update({ remainingAmount: remainingAmountMinus }, { where: { id: budget_id } });
            if (!budget_Update) {
                return res.status(404).send({
                    code: 404, message: "Unable to update Budget",
                });
            }
        } else {
            return res.status(404).send({ code: 404, message: "Your Remaining Amount is too lOW" });
        }

        const updateData = await ProcurementPODetails.update(
            {
                delivery_branch: delivery_branch,
                po_supplier_vendor_name: po_supplier_vendor_name,
                total: total,
                po_remark: po_remark,
                approvel_status: 'PENDING'
            },
            {
                where: {
                    employee_id: employee_id,
                    id: po_id
                },
            }
        );
        const updateData2 = await Approved_POlevelDetails.update({
            Approvel_status: 'PENDING',
            progressStatus: 'OPEN'
        },
            { where: { po_id: po_id }, }
        );

        if (Item_Detail && Item_Detail.length > 0) {
            await Procurement_POItemDetails.destroy({ where: { po_id: po_id } });
        } else if (Service_Detail && Service_Detail.length > 0) {
            await Procurement_POServiceDetails.destroy({ where: { po_id: po_id } });
        }
        let itemPromises = [];
        let servicePromises = [];

        if (po_category_type === "Item PO") {
            if (Array.isArray(Item_Detail) && Item_Detail.length > 0) {
                itemPromises = Item_Detail.map(async (data) => {
                    const item_details = {
                        department: Po_detail.department_name,
                        item_id: data.item_id,
                        po_id: po_id,
                        po_category_type: po_category_type,
                        employee_id: employee_id,
                        item_quantity: data.item_quantity,
                        unit_price: data.unit_price,
                        amount: data.amount,
                        tax: data.tax,
                        asset_category_id: data.asset_category_id,
                    };
                    try {
                        let result = await Procurement_POItemDetails.create(
                            item_details
                        );
                        console.log("Item Created Successfully:", result);
                        return result;
                    } catch (error) {
                        console.error("Item Creation Error:", error);
                        throw error;
                    }
                });
            } else {
                console.log("No valid Item details found");
            }
        } else if (po_category_type === "Service PO") {
            if (Array.isArray(Service_Detail) && Service_Detail.length > 0) {
                servicePromises = Service_Detail.map(async (data) => {
                    const service_details = {
                        department: Po_detail.department_name,
                        service_id: data.service_id,
                        po_id: po_id,
                        po_category_type: po_category_type,
                        employee_id: employee_id,
                        service_quantity: data.service_quantity,
                        unit_price: data.unit_price,
                        amount: data.amount,
                        tax: data.tax,
                        service_category_id: data.service_category_id,
                    };

                    try {
                        result = Procurement_POServiceDetails.create(service_details);
                        console.log("Service Created Successfully:", result);
                        return result;
                    } catch (error) {
                        console.error("Service Creation Error:", error);
                        throw error;
                    }
                });
            } else {
                console.log("No valid Service details found");
            }
        }

        const itemResults = await Promise.all(itemPromises);
        const serviceResults = await Promise.all(servicePromises);

        if (updateData || updateData2) {
            return res.status(200).send({ code: 200, message: "Record Updated Successfully", data: updateData, itemResults, serviceResults });
        } else {
            return res.status(404).send({ code: 404, message: "Unable to Update" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};

exports.get_budget_details = async (req, res) => {
    try {
        const { dept_name, type, financial_year } = req.body;
        const Depart_detail = await Department.findOne({ where: { department_name: dept_name, isDeleted: false, status: "ACTIVE" } });
        const Budget_Details = await Budget.findOne({ where: { isDeleted: false, department_id: Depart_detail.dept_id, type: type, financial_year_id: financial_year } });

        if (Budget_Details) {
            const Procure_budget_Details = await Procurement_Details.findAll({ where: { department: dept_name, financial_year: financial_year, PR_type: type, po_status: "PAID" } });
            const PO_purchase_details = await ProcurementPODetails.findAll({ where: { department_name: dept_name, financial_year: financial_year, po_type: type, po_status: "PAID" } });
            let Total_purchase = 0;
            if (Procure_budget_Details || PO_purchase_details) {
                for (let i = 0; i < Procure_budget_Details.length; i++) {
                    Total_purchase += Procure_budget_Details[i].total_mvp;
                }
                for (let i = 0; i < PO_purchase_details.length; i++) {
                    Total_purchase += PO_purchase_details[i].total;
                }
                var Remaining_Buget = Budget_Details.amount - Total_purchase;
                var remainingAmount = Remaining_Buget;
            }

            if (Procure_budget_Details || PO_purchase_details) {
                const update_budget = await Budget.update({ remainingAmount }, { where: { isDeleted: false, department_id: Depart_detail.dept_id, type: type, financial_year_id: financial_year } });
                const Get_data = await Budget.findOne({
                    where: { department_id: Depart_detail.dept_id, type: type, financial_year_id: financial_year, isDeleted: false }
                })
                if (update_budget) {
                    return res.status(200).send({ code: 200, message: "Budget Updated Successfully", data: Get_data, Total_purchase });
                }
            } else {
                return res.status(403).send({ code: 403, message: "Record Not Found" });
            }
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.Create_PO_BY_PR_request = async (req, res) => {
    try {
        const {
            employee_id, department_name, delivery_branch, po_type, po_supplier_vendor_name, po_date, po_number, po_remark, item_detail, service_detail, po_category_type, total, branch_id, financial_year, procurement_id
        } = req.body;

        var file = req.files.po_attached_doc ? req.files.po_attached_doc[0].path : "";
        const newFile = file.replace(/\\/g, "/");
        var Item_Detail = item_detail ? JSON.parse(item_detail) : null;
        var Service_Detail = service_detail ? JSON.parse(service_detail) : null;

        const departmentInfo = await Department.findOne({
            where: { department_name: req.body.department_name, isDeleted: false, status: "ACTIVE" },
            attributes: ["dept_id", "department_name"],
        });
        if (!departmentInfo) {
            return res
                .status(500)
                .send({ code: 500, message: "Department not found!" });
        }

        const getData = await workFlow.findOne({
            where: {
                workflow_department: departmentInfo.dept_id,
                workflow_type: po_category_type,
            },
            attributes: ["workflow_id"],
        });

        if (!getData || getData.length === 0) {
            return res.status(500).send({
                code: 500,
                message: "Workflow is not created for required department And PO!",
            });
        }
        else {
            const response = await ProcurementPODetails.create({
                department_name, po_number, employee_id, delivery_branch, po_type, po_supplier_vendor_name, po_date, po_remark, po_category_type, total, branch_id, financial_year, procurement_id, po_attached_doc: newFile,
            });

            let itemPromises = [];
            let servicePromises = [];

            if (po_category_type === "Item PO") {
                if (Array.isArray(Item_Detail) && Item_Detail.length > 0) {
                    itemPromises = Item_Detail.map(async (data) => {
                        const item_details = {
                            department: response.department_name,
                            item_id: data.item_id,
                            po_id: response.id,
                            po_category_type: response.po_category_type,
                            employee_id: req.body.employee_id,
                            item_quantity: data.item_quantity,
                            unit_price: data.unit_price,
                            amount: data.amount,
                            tax: data.tax,
                            asset_category_id: data.asset_category_id,
                        };
                        try {
                            let result = await Procurement_POItemDetails.create(
                                item_details
                            );
                            console.log("Item Created Successfully:", result);
                            return result;
                        } catch (error) {
                            console.error("Item Creation Error:", error);
                            throw error;
                        }
                    });
                } else {
                    console.log("No valid Item details found");
                }
            } else if (po_category_type === "Service PO") {
                if (Array.isArray(Service_Detail) && Service_Detail.length > 0) {
                    servicePromises = Service_Detail.map(async (data) => {
                        const service_details = {
                            department: response.department_name,
                            service_id: data.service_id,
                            po_id: response.id,
                            po_category_type: response.po_category_type,
                            employee_id: response.employee_id,
                            service_quantity: data.service_quantity,
                            unit_price: data.unit_price,
                            amount: data.amount,
                            tax: data.tax,
                            service_category_id: data.service_category_id,
                        };

                        try {
                            result = Procurement_POServiceDetails.create(service_details);
                            console.log("Service Created Successfully:", result);
                            return result;
                        } catch (error) {
                            console.error("Service Creation Error:", error);
                            throw error;
                        }
                    });
                } else {
                    console.log("No valid Service details found");
                }
            }

            const itemResults = await Promise.all(itemPromises);
            const serviceResults = await Promise.all(servicePromises);

            const getRole = await workFlowMap.findOne({
                where: {
                    workflowId: getData.workflow_id,
                },
                attributes: ["workflow_roleId", "workflow_employeeId", "workflowId"],
            });

            const getLevels = await workFlowRange.findAll({
                where: {
                    workFlow_id: getRole.workflowId,
                    status: 'ACTIVE'
                },
                attributes: [
                    "level",
                    "workflowrange_employeeId",
                    "progress_Status",
                    "id",
                ],
            });

            const levelPromises = getLevels.map(async (level) => {
                const createdLevel = await Approved_POlevelDetails.create({
                    level: level.level,
                    po_id: response.id,
                    employee_id: level.workflowrange_employeeId,
                    workflow_range_id: level.id,
                });

                return createdLevel;
            });

            await Promise.all(levelPromises);

            return res.status(200).send({
                code: 200,
                message: "Created Successfully!",
                data: response,
                itemResults,
                serviceResults,
            });
        }
    } catch (error) {
        console.error("Main Error:", error);
        return res.status(500).send({
            code: 500,
            message: error.message || "Server Error",
            error: error.stack,
        });
    }
}