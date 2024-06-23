const db = require("../../../models/index");
const ProcurementDetails = db.procurement;
const logs_table = db.logs_table;
const Procurement_productDetails = db.procurement_product;
const Procurement_ServiceDetails = db.procurement_service;
const Procurement_BomItemDetails = db.procurement_bom_item;
const Approved_levelDetails = db.procurement_Approved_level;
const vendorManagementDetails = db.vendorManagement;
const vendor_product_Details = db.vendor_product_details;
const Department = db.department;
const workFlow = db.Work_Flow;
const workFlowRange = db.workflowrange;
const workFlowMap = db.workflowmap;
const userdetail = db.user;
const ItemMasterDetails = db.ItemMaster;
const ServiceMasterDetails = db.Service_master;
const ServiceCategoryDetails = db.ServicesCategory;
const AssetDetails = db.asset;
const Budget = db.tbl_budget;

const { Op, where } = require("sequelize");
const moment = require("moment");
const transport = require("../../../services/nodemailer");
const baseUrl = "https://emerp.elitetraveltech.in/";

////////////////////////create api //////////////////////////
exports.Create_PR_request = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const department = req.body.department;
    const state = req.body.state;
    const city = req.body.city;
    const location = req.body.location;
    const pin = req.body.pin;
    const PR_type = req.body.type;
    const delivery_address = req.body.delivery_address;
    const item_detail = req.body.item_detail;
    const bom_detail = req.body.bom_detail;
    const service_detail = req.body.service_detail;
    const PR_category = req.body.PR_category;
    const financial_year = req.body.financial_year;
    const total_mvp = req.body.total_mvp;

    var file = req.files.file ? req.files.file[0].path : "";
    const newFile = file.replace(/\\/g, "/");
    var Item_Detail = item_detail ? JSON.parse(item_detail) : null;
    var Service_Detail = service_detail ? JSON.parse(service_detail) : null;
    var BOM_Detail = bom_detail ? JSON.parse(bom_detail) : null;

    const lastPR = await ProcurementDetails.findOne({
      order: [["procurement_id", "DESC"]],
    });

    let PR_code = "PR00";
    if (lastPR) {
      const lastPR_id = lastPR.procurement_id;
      PR_code += lastPR_id + 1;
    } else {
      PR_code += "1";
    }

    const departmentInfo = await Department.findOne({
      where: { department_name: req.body.department, isDeleted: false, status: "ACTIVE" },
      attributes: ["dept_id", "department_name"],
    });
    if (!departmentInfo) {
      return res
        .status(500)
        .send({ code: 500, message: "Department not found!" });
    }

    const getData = await workFlow.findOne({
      where: {
        [Op.and]: [
          { workflow_department: departmentInfo.dept_id },
          { workflow_type: req.body.PR_category },
        ],
      },
      attributes: ["workflow_id"],
    });

    if (!getData || getData.length === 0) {
      return res.status(500).send({
        code: 403,
        message: "Workflow is not created for required department And PR!",
      });
    } else {
      const response = await ProcurementDetails.create({
        department, PR_code, employee_id, location, state, city, pin, delivery_address, PR_category,
        file: newFile, total_mvp, financial_year, PR_type
      });

      let itemPromises = [];
      let servicePromises = [];
      let bomitemPromises = [];

      if (PR_category === "Item PR") {
        if (Array.isArray(Item_Detail) && Item_Detail.length > 0) {
          itemPromises = Item_Detail.map(async (data) => {
            const item_details = {
              department: response.department,
              item_id: data.item_id,
              procurement_id: response.procurement_id,
              PR_category: response.PR_category,
              employee_id: req.employee_id,
              item_quantity: data.item_quantity,
              mvp: data.mvp,
              priority: data.priority,
              asset_category_id: data.asset_category_id,
            };
            try {
              let result = await Procurement_productDetails.create(
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
      } else if (PR_category === "Service PR") {
        if (Array.isArray(Service_Detail) && Service_Detail.length > 0) {
          servicePromises = Service_Detail.map(async (data) => {
            const service_details = {
              department: response.department,
              service_id: data.service_id,
              procurement_id: response.procurement_id,
              PR_category: response.PR_category,
              employee_id: response.employee_id,
              service_quantity: data.service_quantity,
              mvp: data.mvp,
              priority: data.priority,
              service_category_id: data.service_category_id,
            };
            try {
              result = Procurement_ServiceDetails.create(service_details);
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
      } else if (PR_category === "BOM PR") {
        if (Array.isArray(BOM_Detail) && BOM_Detail.length > 0) {
          bomitemPromises = BOM_Detail.map(async (data) => {
            const bom_details = {
              department: response.department,
              item_id: data.item_id,
              product_id: data.product_id,
              procurement_id: response.procurement_id,
              PR_category: response.PR_category,
              no_of_bom: data.no_of_bom,
              item_quantity: data.item_quantity,
              mvp: data.mvp,
              bom_category_id: data.bom_category_id,
              employee_id: response.employee_id,
              product_name: data.product_name,
              product_varient: data.product_varient,
              mvp_product: data.mvp_product,
              product_quantity: data.product_quantity,
            };

            try {
              result = Procurement_BomItemDetails.create(bom_details);
              console.log("BomItem Created Successfully:", result);
              return result;
            } catch (error) {
              console.error("BomItem Creation Error:", error);
              throw error;
            }
          });
        } else {
          console.log("No valid BOMItem details found");
        }
      }

      const itemResults = await Promise.all(itemPromises);
      const serviceResults = await Promise.all(servicePromises);
      const bomItemResults = await Promise.all(bomitemPromises);

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
        const createdLevel = await Approved_levelDetails.create({
          level: level.level,
          procurement_id: response.procurement_id,
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
        bomItemResults,
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
};

///////////////////////////// edit PR Request API ////////////////////
exports.editPR_request = async (req, res) => {
  try {
    const pr_id = req.params.id;
    const {
      name,
      department,
      emp_id,
      item_name,
      item_code,
      unit,
      mvp,
      location,
      state,
      city,
      pin,
      delivery_address,
      priority,
    } = req.body;

    var prImage =
      req.files.file == undefined ? "" : (prImage = req.files.file[0].path);

    const getdata = await Procurement_productDetails.findOne({
      where: { procurement_product_id: pr_id },
    });
    var prImage =
      prImage == "" ? (prImage = getdata.file) : (file = baseUrl + prImage);

    if (getdata) {
      const editData = await Procurement_productDetails.update(
        {
          name,
          department,
          emp_id,
          item_name,
          item_code,
          unit,
          mvp,
          location,
          state,
          city,
          pin,
          delivery_address,
          priority,
          file: prImage,
        },
        { where: { procurement_product_id: pr_id } }
      );
      return res
        .status(200)
        .send({ code: 200, message: "Update Successfully!", data: editData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

///////////////////// Get All Product List //////////////////////
exports.getAll_Product = async (req, res) => {
  try {
    const loggedEmployeeId = req.params.id;
    const loggedUserRole = req.body.loggedUserRole;
    let getAllData;

    if (loggedUserRole === "Super Admin") {
      const query = `
        SELECT * FROM procurement_purchase_requests AS pp WHERE pp.status = 'ACTIVE' ORDER BY pp.procurement_id DESC `;

      getAllData = await db.sequelize.query(query, {
        type: db.sequelize.QueryTypes.SELECT,
      });
    } else {
      const query = `
        SELECT * FROM procurement_purchase_requests AS pp 
        WHERE pp.employee_id = ${loggedEmployeeId} and pp.status='ACTIVE' ORDER BY pp.procurement_id DESC `;

      getAllData = await db.sequelize.query(query, {
        type: db.sequelize.QueryTypes.SELECT,
      });
    }

    if (getAllData.length > 0) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Product Successfully",
        data: getAllData,
      });
    } else {
      return res.status(200).send({ code: 200, message: "Record Not Found", data: getAllData });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};

////////////////////////// get All Product by ID /////////////////////
exports.getAll_Product_ByID = async (req, res) => {
  try {
    const procurementId = req.params.id;
    if (procurementId) {
      const getData = await ProcurementDetails.findOne({
        where: {
          procurement_id: procurementId,
        },
      });
      return res.status(200).send({
        code: 200,
        message: "Fetch All Product Successfully",
        data: getData,
      });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found", data: getData });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};

/////////////// Get ById PR ///////////////
exports.get_ById_PR = async (req, res) => {
  try {
    const { procurementId, PR_categories } = req.body;
    let getData = null;

    if (PR_categories === "Item PR") {
      getData = await ProcurementDetails.findAll({
        where: { procurement_id: procurementId },
        include: [
          {
            model: Procurement_productDetails,
            where: { status: "ACTIVE" },
            attributes: [
              "item_quantity",
              "priority",
              "mvp",
              "asset_category_id",
              "item_id",
            ],
            include: {
              model: ItemMasterDetails,
              where: { status: "ACTIVE" },
              attributes: ["item_code", "item_document", "item_name", "MVP"],
              include: {
                model: AssetDetails,
                where: { status: "ACTIVE" },
                attributes: ["asset_category_name"],
              },
            },
          },
        ],
      });
    } else if (PR_categories === "Service PR") {
      getData = await ProcurementDetails.findOne({
        where: { procurement_id: procurementId },
        include: [
          {
            model: Procurement_ServiceDetails,
            where: { status: "ACTIVE" },
            attributes: [
              "department",
              "PR_category",
              "service_quantity",
              "mvp",
              "priority",
              "service_id",
            ],
            include: [
              {
                model: ServiceMasterDetails,
                where: { status: "ACTIVE" },
                attributes: [
                  "service_code",
                  "service_name",
                  "service_description",
                  "MVP",
                  "service_document",
                ],
                include: {
                  model: ServiceCategoryDetails,
                  where: { status: "ACTIVE" },
                  attributes: ["service_category_name"],
                },
              },
            ],
          },
        ],
      });
    } else if (PR_categories === "BOM PR") {
      getData = await ProcurementDetails.findOne({
        where: { procurement_id: procurementId, status: "ACTIVE" },
        include: [
          {
            model: Procurement_BomItemDetails,
            where: { status: "ACTIVE" },
            attributes: [
              "PR_category",
              "product_name",
              "product_varient",
              "item_quantity",
              "mvp",
              "mvp_product",
              "product_quantity",
              "item_id",
            ],
            include: [
              {
                model: ItemMasterDetails,
                where: { status: "ACTIVE" },
                attributes: ["item_code", "item_document", "item_name"],
              },
            ],
          },
        ],
      });
    }

    employee_ID = await ProcurementDetails.findOne({ where: { procurement_id: procurementId } });
    const name = await db.user.findOne({
      where: {
        employee_id: employee_ID.employee_id,
      },
      attributes: ["first_name", "last_name"],
    });
    const result = name.first_name + " " + name.last_name;
    if (getData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch Data Successfully",
        data: Array.isArray(getData) ? getData : [getData],
        result,
      });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found", data: getData });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};

/////////////////////// delete product ///////////////////////////////////////
exports.delete_product = async (req, res) => {
  try {
    const id = req.params.id;
    const getAllData = await product__variant_Details.findOne({
      where: { id: id },
    });
    if (getAllData) {
      await product__variant_Details.update(
        { isDeleted: true },
        { where: { id: id } }
      );
      return res.status(200).send({
        code: 200,
        message: "product Details is Deleted Successfully!",
      });
    } else {
      return res.status(404).send({ code: 403, message: "id not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: "Internal Server Error" });
  }
};

////////////// level of Approved api ///////////////////////////////
exports.create_Approved = async (req, res) => {
  try {
    const { approver_name, approvel_level } = req.body;

    const response = await Approved_levelDetails.create({
      approver_name,
      approvel_level,
    });
    return res
      .status(200)
      .send({ code: 200, message: "Created Successfully!", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////////////////////// get Approvel level list //////////////////////////
exports.getAll_Approval_level = async (req, res) => {
  try {
    const procurement_id = req.params.id;

    const getData = await Approved_levelDetails.findAll({
      where: {
        procurement_id: procurement_id,
      },
      attributes: ["Approvel_status", "level", "employee_id"],
    });

    if (!getData || getData.length === 0) {
      return res.status(400).send({ code: 400, message: "Data not found" });
    }

    const levelsWithNames = [];
    for (const levelInfo of getData) {
      const employeeInfo = await userdetail.findOne({
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
};

/////////////// Get ById Approvel ///////////////
exports.get_ById_Approver = async (req, res) => {
  try {
    const approved_level_id = req.params.id;
    const getData = await Approved_levelDetails.findOne({
      where: { approved_level_id: approved_level_id },
    });
    if (getData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch Approver data Successfully",
        data: getData,
      });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};
/////////////////////// Status Update /////////////////////

exports.update_status = async (req, res) => {
  try {
    const procurement_Id = req.params.id;
    const Approvel_status = req.body.Approvel_status;
    const progressStatus = req.body.progressStatus;
    const employee_id = req.body.employee_id;
    const final_quantity = req.body.final_quantity;
    const final_MVP = req.body.final_MVP;
    const approvel_status = req.body.approvel_status;
    const BOM_Detail = req.body.BOM_Detail;
    const Service_Detail = req.body.Service_Detail;
    const Item_Detail = req.body.Item_Detail;

    const allLevelsData = await Approved_levelDetails.findAll({
      where: {
        [Op.and]: [
          { employee_id: employee_id },
          { procurement_id: procurement_Id },
        ],
      },
      order: [["level", "ASC"]],
    });

    if (allLevelsData !== null) {
      const maxLevel = await Approved_levelDetails.max("level");
      let logDataArray = [];

      if (BOM_Detail && BOM_Detail.length > 0) {
        for (const bomItem of BOM_Detail) {
          logDataArray.push({
            procurement_id: allLevelsData.procurement_id,
            quantity: bomItem.product_quantity,
            MVP: bomItem.mvp_product,
            workflow_range_id: allLevelsData.workflow_range_id,
            employee_id: allLevelsData.employee_id,
            status: req.body.status,
            level: allLevelsData.level,
          });
        }
      } else if (Service_Detail && Service_Detail.length > 0) {
        for (const serviceItem of Service_Detail) {
          logDataArray.push({
            procurement_id: allLevelsData.procurement_id,
            quantity: serviceItem.product_quantity,
            MVP: serviceItem.mvp_product,
            workflow_range_id: allLevelsData.workflow_range_id,
            employee_id: allLevelsData.employee_id,
            status: req.body.status,
            level: allLevelsData.level,
          });
        }
      } else if (Item_Detail && Item_Detail.length > 0) {
        for (const itemDetail of Item_Detail) {
          logDataArray.push({
            procurement_id: allLevelsData.procurement_id,
            quantity: itemDetail.product_quantity,
            MVP: itemDetail.mvp_product,
            workflow_range_id: allLevelsData.workflow_range_id,
            employee_id: allLevelsData.employee_id,
            status: req.body.status,
            level: allLevelsData.level,
          });
        }
      }

      if (logDataArray.length > 0) {
        const logData = await logs_table.bulkCreate(logDataArray);
      }

      const currentLevelData = await Approved_levelDetails.findOne({
        attributes: ["level"],
        where: { employee_id: employee_id, procurement_id: procurement_Id }
      });

      const maxLevelValue = maxLevel !== null ? maxLevel : null;
      const currentLevelValue = currentLevelData
        ? currentLevelData.level
        : null;

      const updateData = await Approved_levelDetails.update({
        Approvel_status: Approvel_status,
        progressStatus: progressStatus, final_MVP: final_MVP, final_quantity: final_quantity,
      },
        { where: { employee_id: employee_id, procurement_id: procurement_Id, }, });

      await ProcurementDetails.update({ total_mvp: final_MVP, },
        { where: { procurement_id: procurement_Id, } });

      if (BOM_Detail && BOM_Detail.length > 0) {
        for (const bomItem of BOM_Detail) {
          const updateData2 = await Procurement_BomItemDetails.update(
            { mvp_product: bomItem.mvp_product, product_quantity: bomItem.product_quantity },
            { where: { item_id: bomItem.item_id, procurement_id: procurement_Id } });
        }
      }

      if (Service_Detail && Service_Detail.length > 0) {
        for (const serviceItem of Service_Detail) {
          const updateData3 = await Procurement_ServiceDetails.update(
            {
              mvp: serviceItem.mvp, service_quantity: serviceItem.service_quantity,
            },
            { where: { service_id: serviceItem.service_id, procurement_id: procurement_Id } });
        }
      }

      if (Item_Detail && Item_Detail.length > 0) {
        for (const itemDetail of Item_Detail) {
          const updateData4 = await Procurement_productDetails.update(
            { mvp: itemDetail.mvp, item_quantity: itemDetail.item_quantity, },
            { where: { item_id: itemDetail.item_id, procurement_id: procurement_Id, } });
        }
      }

      if (Approvel_status === 'REJECTED') {
        const PR_detail = await ProcurementDetails.findOne({ where: { procurement_id: procurement_Id } });
        await ProcurementDetails.update({ approvel_status: Approvel_status, po_status: 'UNPAID' },
          { where: { procurement_id: procurement_Id } }
        );
        const Depart_detail = await Department.findOne({ where: { department_name: PR_detail.department } });
        const Budget_Details = await Budget.findOne({ where: { department_id: Depart_detail.dept_id, type: PR_detail.PR_type, financial_year_id: PR_detail.financial_year, isDeleted: false } });

        const Total_Remaining_budget = Budget_Details.remainingAmount;
        const updatedremainingAmount = Total_Remaining_budget + PR_detail.total_mvp;

        if (updatedremainingAmount) {
          const budget_Update = await Budget.update({ remainingAmount: updatedremainingAmount }, { where: { id: Budget_Details.id } });
          if (!budget_Update) {
            return res.status(404).send({
              code: 404, message: "Unable to update budget",
            });
          }
          return res.status(200).send({
            code: 200, message: "PR Rejected Successfully",
          });
        }
      } else if (maxLevelValue !== null && currentLevelValue !== null && currentLevelValue === maxLevelValue) {
        const currentApprovelStatus = await ProcurementDetails.findOne({
          attributes: ["approvel_status"],
          where: { procurement_id: procurement_Id },
        });

        if (currentApprovelStatus !== null && currentApprovelStatus.approvel_status !== approvel_status) {
          const finalApproved = await ProcurementDetails.update(
            { approvel_status: approvel_status },
            { where: { procurement_id: procurement_Id } }
          );

          return res.status(200).send({
            code: 200,
            message: "PR Approved Successfully. This is the last level.",
            data: updateData,
            finalApproved,
          });
        }
      } else if (updateData !== null) {
        return res.status(200).send({
          code: 200,
          message: "PR Approved Successfully",
          data: updateData,
        });
      } else {
        return res.status(404).send({ code: 404, message: "Unable to Approve" });
      }
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ code: 500, message: error.message || "Server Error" });
  }
};

////////////////////// Status Update Approvel level /////////////////////
exports.update_approvel_status = async (req, res) => {
  try {
    const approved_level_id = req.params.id;
    const getData = await Approved_levelDetails.findOne({
      where: { approved_level_id: approved_level_id },
    });

    if (getData) {
      const updateData = await Approved_levelDetails.update(req.body, {
        where: { approved_level_id: approved_level_id },
      });
      return res
        .status(200)
        .send({ code: 200, message: "Updated SuccessFully", data: updateData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////// get All Approved PR /////////////////////////////
exports.getAll_Approved_pr = async (req, res) => {
  try {
    const loggedEmployeeId = req.params.id;
    const loggedUserRole = req.body.user_role;

    let getAllData;

    if (loggedUserRole === "Super Admin") {
      const query = `SELECT * FROM procurement_purchase_requests AS pp WHERE pp.status = 'ACTIVE' AND pp.approvel_status = 'APPROVED' ORDER BY pp.procurement_id DESC `;

      getAllData = await db.sequelize.query(query, {
        type: db.sequelize.QueryTypes.SELECT,
      });
    } else {
      const query = `SELECT * FROM procurement_purchase_requests AS pp 
            INNER JOIN procurement_approvel_level AS la ON la.procurement_id = pp.procurement_id 
            WHERE la.employee_id = ${loggedEmployeeId} AND la.Approvel_status = 'APPROVED' AND la.progressStatus='CLOSE' ORDER BY pp.procurement_id DESC `;

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
      return res.status(200).send({ code: 200, message: "Record Not Found", data: getAllData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.getAll_Approved_pr_getBy_id = async (req, res) => {
  try {
    const procurement_product_id = req.params.id;
    const getAllData = await Procurement_productDetails.findOne({
      where: {
        status: "ACTIVE",
        approvel_status: "APPROVED",
        procurement_product_id: procurement_product_id,
      },
    });
    let allData = await vendor_product_Details.findOne({
      where: { procurement_product_id: procurement_product_id, checked: true },
    });
    let vendor_id = allData.vendors;
    let vendorData = await vendorManagementDetails.findOne({
      where: { vendor_management_id: vendor_id },
    });
    let vendor_name = vendorData.vendor_name;
    let newData = {
      ...getAllData.dataValues,
      ...allData.dataValues,
      vendor_name,
    };
    if (getAllData) {
      // obj = {
      //     "procurement_product_id" :getAllData.procurement_product_id,
      //     "vendor_product_details_id" : allData.vendor_product_details_id
      // }

      return res.status(200).send({
        code: 200,
        message: "Fetch All PR Successfully",
        data: newData,
      });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.getAll_vendor_pr = async (req, res) => {
  try {
    const pro_id = req.params.id;
    const getAllData = await vendor_product_Details.findAll({
      where: { procurement_product_id: pro_id },
    });
    let array = [];
    for (let i = 0; i < getAllData.length; i++) {
      const vendor_id = getAllData[i].vendors;
      const get_vendor_name = await vendorManagementDetails.findOne({
        where: { vendor_management_id: vendor_id },
      });

      let obj = {
        vendor_product_details_id: getAllData[i].vendor_product_details_id,
        procurement_product_id: getAllData[i].procurement_product_id,
        product_image: getAllData[i].product_image,
        item_name: getAllData[i].item_name,
        item_code: getAllData[i].item_code,
        unit: getAllData[i].unit,
        priority: getAllData[i].priority,
        mvp: getAllData[i].mvp,
        location: getAllData[i].location,
        state: getAllData[i].state,
        city: getAllData[i].city,
        pin: getAllData[i].pin,
        delivery_address: getAllData[i].delivery_address,
        file: getAllData[i].file,
        remarks: getAllData[i].remarks,
        name: getAllData[i].name,
        department: getAllData[i].department,
        emp_id: getAllData[i].emp_id,
        approvel_status: getAllData[i].approvel_status,
        status: getAllData[i].status,
        end_date: getAllData[i].end_date,
        vendors: getAllData[i].vendors,
        rfp_status: getAllData[i].rfp_status,
        price_amt: getAllData[i].price_amt,
        sgst: getAllData[i].sgst,
        cgst: getAllData[i].cgst,
        igst: getAllData[i].igst,
        delivery_charges: getAllData[i].delivery_charges,
        additional_charges: getAllData[i].additional_charges,
        currency: getAllData[i].currency,
        vendor_remarks: getAllData[i].vendor_remarks,
        vendor_uploaded_document: getAllData[i].vendor_uploaded_document,
        remarks_approvel: getAllData[i].remarks_approvel,
        approvel_vendor: getAllData[i].approvel_vendor,
        final_remarks: getAllData[i].final_remarks,
        checked: getAllData[i].checked,
        is_disabled: getAllData[i].is_disabled,
        vendor_name: get_vendor_name.vendor_name,
      };
      array.push(obj);
    }

    let newData1 = [];
    let newData = array.sort((p1, p2) =>
      p1.mvp > p2.mvp ? 1 : p1.mvp < p2.mvp ? -1 : 0
    );

    for (let i = 0; i < newData.length; i++) {
      if (newData[i].price_amt !== null) {
        newData1.push(newData[i]);
      }
    }
    if (newData1.length > 0) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All PR Successfully",
        data: newData1,
      });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found", data: newData1 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////// get All Rejected PR /////////////////////////////
exports.getAll_Rejected_pr = async (req, res) => {
  try {
    const loggedEmployeeId = req.params.id;
    const loggedUserRole = req.body.user_role;

    let getAllData;

    if (loggedUserRole === "Super Admin") {
      const query = `SELECT * FROM procurement_purchase_requests AS pp WHERE pp.status = 'ACTIVE' AND pp.approvel_status = 'REJECTED' ORDER BY pp.procurement_id DESC`;

      getAllData = await db.sequelize.query(query, {
        type: db.sequelize.QueryTypes.SELECT,
      });
    } else {
      const query = `SELECT * FROM procurement_purchase_requests AS pp 
            INNER JOIN procurement_approvel_level AS la ON la.procurement_id = pp.procurement_id 
            WHERE la.employee_id = ${loggedEmployeeId} AND la.Approvel_status = 'REJECTED' AND la.progressStatus='CLOSE' ORDER BY pp.procurement_id DESC `;

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
      return res.status(200).send({ code: 200, message: "Record Not Found", data: getAllData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////// get All To be Approved PR /////////////////////////////

exports.getAll_to_be_approve_pr = async (req, res) => {
  try {
    const loggedEmployeeId = req.params.id;
    const query = `
    SELECT * FROM procurement_purchase_requests AS pp 
    LEFT JOIN procurement_approvel_level as la ON la.procurement_id=pp.procurement_id and la.employee_id= ${loggedEmployeeId} 
    WHERE la.Approvel_status='PENDING' and pp.procurement_id IN (
        SELECT pa.procurement_id 
        FROM procurement_approvel_level AS pa 
        WHERE pa.employee_id = ${loggedEmployeeId} 
        AND (
            (pa.level = 1)
            OR 
            (
                pa.level > 1 
                AND 
                (
                    SELECT COUNT(pl.id) 
                    FROM procurement_approvel_level AS pl 
                    WHERE pl.procurement_id = pa.procurement_id 
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
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.check_workflow_ByCategory = async (req, res) => {
  try {
    const { category_id, workflow_type, department_name } = req.body;
    const departmentInfo = await Department.findOne({
      where: { department_name: department_name, isDeleted: false, status: "ACTIVE" },
    });
    const alreadyExists = await workFlow.findOne({ where: { workflow_type: workflow_type, workflow_category: category_id, workflow_department: departmentInfo.dept_id, status: "ACTIVE" } });
    if (!alreadyExists) {
      return res.status(404).send({ code: 404, message: "Workflow is not Created for given Category And workflow_type" });
    } else {
      return res.status(200).json({ code: 200, message: "Workflow Exists", data: alreadyExists });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

/////////////////////// get by id approved PR //////////////////////////////////
exports.getBy_id = async (req, res) => {
  try {
    const procurement_product_id = req.params.id;
    const getData = await Procurement_productDetails.findOne({
      where: { procurement_product_id: procurement_product_id },
    });
    if (getData) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Successfully", data: getData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////////////// Send RFP Link ///////////////////////
exports.sendRFP = async (req, res) => {
  try {
    const {
      vendors,
      end_date,
      vendors_invited_count,
      item_detail,
      site_url,
      Rfp_Number,
      procurement_type,
      procurement_id,
    } = req.body;
    console.log(Rfp_Number);
    let all_Data = vendors ? JSON.parse(vendors) : null;
    let all_Data2 = item_detail ? JSON.parse(item_detail) : null;

    const updatedProducts = [];

    for (let i = 0; i < all_Data2.length; i++) {
      const currentProduct = all_Data2[i];
      const currentProductId = currentProduct.item_id;

      if (!currentProduct.list || currentProduct.list.length === 0) {
        return res.status(400).send({
          code: 400,
          message: `Vendor list is empty for ${currentProductId}`,
        });
      }

      const vendorIds = [];
      for (let j = 0; j < currentProduct.list.length; j++) {
        const vendorId = currentProduct.list[j].id;
        vendorIds.push(vendorId);
      }

      const getData = await Procurement_productDetails.findOne({
        where: { item_id: currentProductId },
      });

      if (getData) {
        await Procurement_productDetails.update(
          {
            vendors: vendorIds,
            end_date,
            vendors_invited_count,
          },
          { where: { item_id: currentProductId } }
        );

        await Procurement_productDetails.update(
          {
            rfp_status: "LIVE RFP",
          },
          { where: { item_id: currentProductId } }
        );

        const getAll_data = await Procurement_productDetails.findOne({
          where: { item_id: currentProductId },
        });

        for (let k = 0; k < currentProduct.list.length; k++) {
          const vendorId = currentProduct.list[k].id;
          const get_vendorData = await vendorManagementDetails.findOne({
            where: { vendor_management_id: vendorId },
          });

          if (get_vendorData) {
            const obj = {
              procurement_product_id: getAll_data.procurement_product_id,
              product_image: getAll_data.product_image,
              item_name: getAll_data.item_name,
              item_code: getAll_data.item_code,
              unit: getAll_data.unit,
              priority: getAll_data.priority,
              mvp: getAll_data.mvp,
              location: getAll_data.location,
              state: getAll_data.state,
              city: getAll_data.city,
              pin: getAll_data.pin,
              delivery_address: getAll_data.delivery_address,
              file: getAll_data.file,
              remarks: getAll_data.remarks,
              name: getAll_data.name,
              department: getAll_data.department,
              emp_id: getAll_data.emp_id,
              approvel_status: getAll_data.approvel_status,
              status: getAll_data.status,
              end_date: getAll_data.end_date,
              vendors: vendorId,
              rfp_status: getAll_data.rfp_status,
              Rfp_Number: req.body.Rfp_Number,
              procurement_type: req.body.procurement_type,
              procurement_id: req.body.procurement_id,
            };
            await vendor_product_Details.create(obj);
            const link = `${site_url}?vendor_id=${vendorId}&Rfp_no=${Rfp_Number}&type=${procurement_type}`;
            await transport.mailsend({
              from: process.env.EMAIL_FROM,
              to: get_vendorData.email,
              subject: "link for request for proposal",
              html: `<p><strong> Hi ${get_vendorData.vendor_name}</strong> <br> <p style=" padding: 3%; background-image: url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg');"> 
                       Simply click the button below to link for request for proposal ${get_vendorData.email} <a href="${link}">
                      <button class="btn" style="padding: 6px 8px; border-radius: 7px;cursor: pointer; border-color: blue; color: white; background-color: blue;"> Click Me </button></a></p>`,
            });
          }
        }

        await vendor_product_Details.update(
          {
            updateValue: false,
          },
          { where: { procurement_product_id: currentProductId } }
        );

        updatedProducts.push({ item_id: currentProductId });
      } else {
        return res.status(403).send({
          code: 403,
          message: `Record Not Found for ${currentProductId}`,
        });
      }
    }

    return res.status(200).send({
      code: 200,
      message: "Updated Successfully",
      data: updatedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};
///////////////////////////// Send RFp For Sevice /////////////////////////////////
exports.sendRFP_for_Service = async (req, res) => {
  try {
    const {
      vendors,
      end_date,
      vendors_invited_count,
      services_details,
      site_url,
      Rfp_Number,
      procurement_type,
      procurement_id,
    } = req.body;
    console.log(Rfp_Number);
    let all_Data = vendors ? JSON.parse(vendors) : null;
    let all_Data2 = services_details ? JSON.parse(services_details) : null;

    const updatedProducts = [];

    for (let i = 0; i < all_Data2.length; i++) {
      const currentProduct = all_Data2[i];
      const currentProductId = currentProduct.service_id;

      if (!currentProduct.list || currentProduct.list.length === 0) {
        return res.status(400).send({
          code: 400,
          message: `Vendor list is empty for ${currentProductId}`,
        });
      }

      const vendorIds = [];
      for (let j = 0; j < currentProduct.list.length; j++) {
        const vendorId = currentProduct.list[j].id;
        vendorIds.push(vendorId);
      }

      const getData = await Procurement_ServiceDetails.findOne({
        where: { service_id: currentProductId },
      });

      if (getData) {
        await Procurement_ServiceDetails.update(
          {
            vendors: vendorIds,
            end_date,
            vendors_invited_count,
          },
          { where: { service_category_id: currentProductId } }
        );

        await Procurement_ServiceDetails.update(
          {
            rfp_status: "LIVE RFP",
          },
          { where: { service_id: currentProductId } }
        );

        const getAll_data = await Procurement_ServiceDetails.findOne({
          where: { service_id: currentProductId },
        });

        for (let k = 0; k < currentProduct.list.length; k++) {
          const vendorId = currentProduct.list[k].id;
          const get_vendorData = await vendorManagementDetails.findOne({
            where: { vendor_management_id: vendorId },
          });

          if (get_vendorData) {
            const obj = {
              procurement_service_id: getAll_data.procurement_service_id,
              product_image: getAll_data.product_image,
              item_name: getAll_data.item_name,
              item_code: getAll_data.item_code,
              unit: getAll_data.unit,
              priority: getAll_data.priority,
              mvp: getAll_data.mvp,
              location: getAll_data.location,
              state: getAll_data.state,
              city: getAll_data.city,
              pin: getAll_data.pin,
              delivery_address: getAll_data.delivery_address,
              file: getAll_data.file,
              remarks: getAll_data.remarks,
              name: getAll_data.name,
              department: getAll_data.department,
              emp_id: getAll_data.emp_id,
              approvel_status: getAll_data.approvel_status,
              status: getAll_data.status,
              end_date: getAll_data.end_date,
              vendors: vendorId,
              rfp_status: getAll_data.rfp_status,
              Rfp_Number: req.body.Rfp_Number,
              procurement_type: req.body.procurement_type,
              procurement_id: req.body.procurement_id,
            };
            const newVendorProduct = await vendor_product_Details.create(obj);

            const linkForVendorProduct = `${site_url}?vendor_id=${vendorId}&Rfp_no=${Rfp_Number}&type=${procurement_type}`;
            await transport.mailsend({
              from: process.env.EMAIL_FROM,
              to: get_vendorData.email,
              subject: "link for request for proposal (Vendor Product Details)",
              html: `<p><strong> Hi ${get_vendorData.vendor_name}</strong> <br> <p style=" padding: 3%; background-image: url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg');"> 
                       Simply click the button below to view request for proposal details for Vendor Product ${get_vendorData.email} <a href="${linkForVendorProduct}">
                      <button class="btn" style="padding: 6px 8px; border-radius: 7px;cursor: pointer; border-color: blue; color: white; background-color: blue;"> Click Me </button></a></p>`,
            });

            updatedProducts.push({ item_id: currentProductId });
          }
        }

        await vendor_product_Details.update(
          {
            updateValue: false,
          },
          { where: { procurement_product_id: currentProductId } }
        );
      } else {
        return res.status(403).send({
          code: 403,
          message: `Record Not Found for ${currentProductId}`,
        });
      }
    }

    return res.status(200).send({
      code: 200,
      message: "Updated Successfully",
      data: updatedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


////////////////////////////// Send RFp for BOM Details ///////////////////////////////
exports.sendRFP_for_BOM = async (req, res) => {
  try {
    const {
      vendors,
      end_date,
      vendors_invited_count,
      bom_details,
      site_url,
      Rfp_Number,
      procurement_type,
      procurement_id
    } = req.body;
    console.log(Rfp_Number);
    let all_Data = vendors ? JSON.parse(vendors) : null;
    let all_Data2 = bom_details ? JSON.parse(bom_details) : null;

    const updatedProducts = [];

    for (let i = 0; i < all_Data2.length; i++) {
      const currentProduct = all_Data2[i];
      const currentProductId = currentProduct.item_id;

      if (!currentProduct.list || currentProduct.list.length === 0) {
        return res.status(400).send({
          code: 400,
          message: `Vendor list is empty for ${currentProductId}`,
        });
      }

      const vendorIds = [];
      for (let j = 0; j < currentProduct.list.length; j++) {
        const vendorId = currentProduct.list[j].id;
        vendorIds.push(vendorId);
      }

      const getData = await Procurement_BomItemDetails.findOne({
        where: { item_id: currentProductId },
      });

      if (getData) {
        await Procurement_BomItemDetails.update(
          {
            vendors: vendorIds,
            end_date,
            vendors_invited_count,
          },
          { where: { item_id: currentProductId } }
        );

        await Procurement_BomItemDetails.update(
          {
            rfp_status: "LIVE RFP",
          },
          { where: { item_id: currentProductId } }
        );

        const getAll_data = await Procurement_BomItemDetails.findOne({
          where: { item_id: currentProductId },
        });

        for (let k = 0; k < currentProduct.list.length; k++) {
          const vendorId = currentProduct.list[k].id;
          const get_vendorData = await vendorManagementDetails.findOne({
            where: { vendor_management_id: vendorId },
          });

          if (get_vendorData) {
            const obj = {
              procurement_bomItem_id: getAll_data.procurement_bomItem_id,
              product_image: getAll_data.product_image,
              item_name: getAll_data.item_name,
              item_code: getAll_data.item_code,
              unit: getAll_data.unit,
              priority: getAll_data.priority,
              mvp: getAll_data.mvp,
              location: getAll_data.location,
              state: getAll_data.state,
              city: getAll_data.city,
              pin: getAll_data.pin,
              delivery_address: getAll_data.delivery_address,
              file: getAll_data.file,
              remarks: getAll_data.remarks,
              name: getAll_data.name,
              department: getAll_data.department,
              emp_id: getAll_data.emp_id,
              approvel_status: getAll_data.approvel_status,
              status: getAll_data.status,
              end_date: getAll_data.end_date,
              vendors: vendorId,
              rfp_status: getAll_data.rfp_status,
              Rfp_Number: req.body.Rfp_Number,
              procurement_type: req.body.procurement_type,
              procurement_id: req.body.procurement_id
            };
            const newVendorProduct = await vendor_product_Details.create(obj);

            const linkForVendorProduct = `${site_url}?vendor_id=${vendorId}&Rfp_no=${Rfp_Number}&type=${procurement_type}`;
            await transport.mailsend({
              from: process.env.EMAIL_FROM,
              to: get_vendorData.email,
              subject: "link for request for proposal (Vendor Product Details)",
              html: `<p><strong> Hi ${get_vendorData.vendor_name}</strong> <br> <p style=" padding: 3%; background-image: url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg');"> 
                       Simply click the button below to view request for proposal details for Vendor Product ${get_vendorData.email} <a href="${linkForVendorProduct}">
                      <button class="btn" style="padding: 6px 8px; border-radius: 7px;cursor: pointer; border-color: blue; color: white; background-color: blue;"> Click Me </button></a></p>`,
            });

            updatedProducts.push({ item_id: currentProductId });
          }
        }

        await vendor_product_Details.update(
          {
            updateValue: false,
          },
          { where: { procurement_product_id: currentProductId } }
        );
      } else {
        return res.status(403).send({
          code: 403,
          message: `Record Not Found for ${currentProductId}`,
        });
      }
    }

    return res.status(200).send({
      code: 200,
      message: "Updated Successfully",
      data: updatedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////

////////////////// update vendor qutation data //////////////////

exports.update_vendorData = async (req, res) => {
  try {
    const vendors = req.params.id;
    const rfp_number = req.body.rfp_number;
    const procurement_id = req.body.procurement_id;
    const product_details = req.body.product_details;

    if (!product_details) {
      return res
        .status(400)
        .json({ code: 400, message: "Product details are required" });
    }

    const all_Data2 = JSON.parse(product_details);

    const getData = await vendor_product_Details.findAll({
      where: {
        vendors: vendors,
        Rfp_Number: rfp_number,
        procurement_id: procurement_id,
      },
    });

    if (getData.length > 0) {
      const updatePromises = [];
      for (let i = 0; i < all_Data2.length; i++) {
        const data = all_Data2[i];
        const pp_id = getData[i].procurement_product_id;

        const updateData = await vendor_product_Details.update(
          {
            price_amt: data.price_amt,
            sgst: data.sgst,
            cgst: data.cgst,
            igst: data.igst,
            delivery_charges: data.delivery_charges,
            additional_charges: data.additional_charges,
            currency: data.currency,
            vendor_remarks: data.vendor_remarks,
            vendor_responded: "TRUE",
          },
          {
            where: {
              procurement_product_id: pp_id,
              vendors: vendors,
            },
          }
        );

        const newData = await vendor_product_Details.findOne({
          where: { procurement_product_id: pp_id, vendors: vendors },
          attributes: ["vendor_responded"],
        });

        if (newData.vendor_responded === "FALSE") {
          let vendor_responded_count = 0;
          const allVendorData = await vendor_product_Details.findAll({
            where: { procurement_product_id: pp_id },
          });
          for (let j = 0; j < allVendorData.length; j++) {
            const sgst = allVendorData[j].sgst;
            if (sgst != null) {
              vendor_responded_count + 1;
            }
          }

          await Procurement_productDetails.update(
            { vendors_responded_count: vendor_responded_count },
            {
              where: {
                procurement_id: procurement_id,
                procurement_product_id: pp_id,
                vendors: vendors,
              },
            }
          );
        }
        updatePromises.push(updateData);
      }

      await Promise.all(updatePromises);
      return res
        .status(200)
        .json({ code: 200, message: "Update Successfully" });
    } else {
      return res.status(403).json({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Server Error" });
  }
};

///////////////// Update VEdnor Data For Service  //////////////////////

exports.update_vendorData_for_service = async (req, res) => {
  try {
    const vendors = req.params.id;
    const rfp_number = req.body.rfp_number;
    const procurement_id = req.body.procurement_id;
    const product_details = req.body.product_details;

    if (!product_details) {
      return res
        .status(400)
        .json({ code: 400, message: "Product details are required" });
    }

    const all_Data2 = JSON.parse(product_details);

    const getData = await vendor_product_Details.findAll({
      where: {
        [Op.and]: [
          { vendors: vendors },
          { Rfp_Number: rfp_number },
          { procurement_id: procurement_id },
        ],
      },
    });

    if (getData.length > 0) {
      const updatePromises = [];
      for (let i = 0; i < all_Data2.length; i++) {
        const data = all_Data2[i];
        const pp_id = getData[i].procurement_product_id;

        const updateData = await vendor_product_Details.update(
          {
            price_amt: data.price_amt,
            sgst: data.sgst,
            cgst: data.cgst,
            igst: data.igst,
            delivery_charges: data.delivery_charges,
            additional_charges: data.additional_charges,
            currency: data.currency,
            vendor_remarks: data.vendor_remarks,
          },
          {
            where: {
              procurement_service_id: pp_id,
              vendors: vendors,
            },
          }
        );

        const newData = await vendor_product_Details.findAll({
          where: { procurement_service_id: pp_id, vendors: vendors },
        });

        if (newData[0].vendor_responded == "FALSE") {
          let vendor_responded_count = 0;
          for (let j = 0; j < newData.length; j++) {
            const sgst = newData[j].sgst;
            if (sgst != null) {
              vendor_responded_count + 1;
            }
          }

          await Procurement_ServiceDetails.update(
            { vendors_responded_count: vendor_responded_count },
            {
              where: {
                procurement_id: procurement_id,
                procurement_service_id: pp_id,
              },
            }
          );
        }

        updatePromises.push(updateData);
      }

      await Promise.all(updatePromises);
      return res
        .status(200)
        .json({ code: 200, message: "Update Successfully" });
    } else {
      return res.status(403).json({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Server Error" });
  }
};


////////////////////////////////////////////////////////////////////////

/////////////////////////// get All live rfp ///////////////////////////

exports.GetAll_liveRFP = async (req, res) => {
  try {
    const getAllData = await Procurement_productDetails.findAll({
      where: { status: "ACTIVE", rfp_status: "LIVE RFP" },
    });
    const getAllData2 = await Procurement_BomItemDetails.findAll({
      where: { status: "ACTIVE", rfp_status: "LIVE RFP" },
    });
    const getAllData3 = await Procurement_ServiceDetails.findAll({
      where: { status: "ACTIVE", rfp_status: "LIVE RFP" },
    });

    const combinedData = [...getAllData, ...getAllData2, ...getAllData3];
    const dataMap = {};
    combinedData.forEach(item => {
      if (!dataMap[item.procurement_id]) {
        dataMap[item.procurement_id] = item;
      }
    });
    const finalData = Object.values(dataMap);

    if (finalData.length > 0) {
      return res.status(200).send({ code: 200, message: "Get Successfully", data: finalData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found", data: null });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


/////////////////////////// get All Close rfp ///////////////////////////


exports.GetAll_CloseRFP = async (req, res) => {
  try {
    const arr = [];
    const getAllData = await Procurement_productDetails.findAll({
      where: { status: "ACTIVE", rfp_status: "CLOSE RFP" },
    });
    const getAllData2 = await Procurement_BomItemDetails.findAll({
      where: { status: "ACTIVE", rfp_status: "CLOSE RFP" },
    });
    const getAllData3 = await Procurement_ServiceDetails.findAll({
      where: { status: "ACTIVE", rfp_status: "CLOSE RFP" },
    });
    arr.push(...getAllData, ...getAllData2, ...getAllData3);

    if (arr.length > 0) {
      return res
        .status(200)
        .send({ code: 200, message: "Get Successfully", data: arr });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


// exports.GetAll_CloseRFP = async (req, res) => {
//   try {
//     const getAllData = await Procurement_productDetails.findAll({
//       where: { status: "ACTIVE" },
//     });
//     const getAllData1 = await Procurement_productDetails.findAll({
//       where: { status: "ACTIVE", rfp_status: "CLOSE RFP" },
//     });
//     let current_Date = moment(new Date()).format("YYYY-MM-DD");

//     for (let i = 0; i < getAllData.length; i++) {
//       const procurement_product_id = getAllData[i].procurement_product_id;
//       const end_Date = getAllData[i].end_date;

//       if (end_Date < current_Date) {
//         await Procurement_productDetails.update(
//           {
//             rfp_status: "CLOSE RFP",
//           },
//           { where: { procurement_product_id: procurement_product_id } }
//         );
//       }
//     }

//     if (getAllData) {
//       return res
//         .status(200)
//         .send({ code: 200, message: "Get Successfully", data: getAllData1 });
//     } else {
//       return res.status(403).send({ code: 403, message: "Record Not Found" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// };

//////////////////////// update RFP end date status ////////////////////////

// exports.update_endDate = async (req, res) => {
//   try {
//     const procurement_product_id = req.params.id;
//     let end_date = req.body.end_date;
//     const getData = await Procurement_productDetails.findOne({
//       where: { procurement_product_id: procurement_product_id },
//     });
//     if (getData) {
//       const updateData = await Procurement_productDetails.update(
//         {
//           end_date: end_date,
//         },
//         { where: { procurement_product_id: procurement_product_id } }
//       );

//       return res
//         .status(200)
//         .send({ code: 200, message: "UPdate Successfully", data: updateData });
//     } else {
//       return res.status(403).send({ code: 403, message: "Record Not Found" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// };

exports.update_endDate = async (req, res) => {
  try {
    const procurement_id = req.params.id;
    const end_date = req.body.end_date;
    const getData = await Procurement_productDetails.findOne({
      where: { procurement_id: procurement_id },
    });
    if (getData) {
      const updateData = await Procurement_productDetails.update(
        {
          end_date: end_date,
        },
        { where: { procurement_id: procurement_id } }
      );
      const getData2 = await vendor_product_Details.findOne({
        where: { procurement_id: procurement_id },
      });
      if (getData2) {
        const updateData2 = await vendor_product_Details.update(
          {
            end_date: end_date,
          },
          { where: { procurement_id: procurement_id } }
        );
      }
      return res
        .status(200)
        .send({ code: 200, message: "End Date Updated Successfully" });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////////// Delete live RFP /////////////////////////////

exports.delete_live_rfp = async (req, res) => {
  try {
    const procurement_product_id = req.params.id;
    const getData = await Procurement_productDetails.findOne({
      where: { procurement_product_id: procurement_product_id },
    });
    if (getData) {
      const updateData = await Procurement_productDetails.update(req.body, {
        where: { procurement_product_id: procurement_product_id },
      });

      return res
        .status(200)
        .send({ code: 200, message: "Delete Successfully", data: updateData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////////// approvel api quotation /////////////////////////////

exports.quotation_approvel = async (req, res) => {
  try {
    const procurement_product_id = req.params.id;
    const { remarks_approvel, approvel_vendor } = req.body;
    const getData = await vendor_product_Details.findOne({
      where: { procurement_product_id: procurement_product_id },
    });
    if (getData) {
      const updateData = await vendor_product_Details.update(
        {
          remarks_approvel,
          approvel_vendor,
        },
        { where: { procurement_product_id: procurement_product_id } }
      );

      return res
        .status(200)
        .send({ code: 200, message: "UPdate Successfully", data: updateData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

////////////////////////////// get All Approved Vendor ///////////////////////////

exports.GetAll_Approved_vendor = async (req, res) => {
  try {
    const getAllData = await vendor_product_Details.findAll({
      where: { approvel_vendor: "APPROVED" },
    });

    if (getAllData) {
      return res
        .status(200)
        .send({ code: 200, message: "Get Successfully", data: getAllData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

///////////////////////////// get All Approved Cost ///////////////////////////

exports.GetAll_Approved_Cost = async (req, res) => {
  try {
    const getAllData = await vendor_product_Details.findAll({
      where: { approvel_vendor: "APPROVED COST" },
    });
    let array = [];
    if (getAllData) {
      for (let i = 0; i < getAllData.length; i++) {
        const vendor_id = getAllData[i].vendors;
        const get_vendor_name = await vendorManagementDetails.findOne({
          where: { vendor_management_id: vendor_id },
        });

        obj = {
          vendor_product_details_id: getAllData[i].vendor_product_details_id,
          procurement_product_id: getAllData[i].procurement_product_id,
          product_image: getAllData[i].product_image,
          item_name: getAllData[i].item_name,
          item_code: getAllData[i].item_code,
          unit: getAllData[i].unit,
          priority: getAllData[i].priority,
          mvp: getAllData[i].mvp,
          location: getAllData[i].location,
          state: getAllData[i].state,
          city: getAllData[i].city,
          pin: getAllData[i].pin,
          delivery_address: getAllData[i].delivery_address,
          file: getAllData[i].file,
          remarks: getAllData[i].remarks,
          name: getAllData[i].name,
          department: getAllData[i].department,
          emp_id: getAllData[i].emp_id,
          approvel_status: getAllData[i].approvel_status,
          status: getAllData[i].status,
          end_date: getAllData[i].end_date,
          vendors: getAllData[i].vendors,
          rfp_status: getAllData[i].rfp_status,
          price_amt: getAllData[i].price_amt,
          sgst: getAllData[i].sgst,
          cgst: getAllData[i].cgst,
          igst: getAllData[i].igst,
          delivery_charges: getAllData[i].delivery_charges,
          additional_charges: getAllData[i].additional_charges,
          currency: getAllData[i].currency,
          vendor_remarks: getAllData[i].vendor_remarks,
          vendor_uploaded_document: getAllData[i].vendor_uploaded_document,
          remarks_approvel: getAllData[i].remarks_approvel,
          approvel_vendor: getAllData[i].approvel_vendor,
          final_remarks: getAllData[i].final_remarks,
          checked: getAllData[i].checked,
          is_disabled: getAllData[i].is_disabled,
          vendor_name: get_vendor_name.vendor_name,
        };
        array.push(obj);
      }
      return res
        .status(200)
        .send({ code: 200, message: "Get Successfully", data: array });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

///////////////////////////// get All Approved Cost ///////////////////////////

exports.GetAll_rejected = async (req, res) => {
  try {
    const getAllData = await vendor_product_Details.findAll({
      where: { approvel_vendor: "REJECTED" },
    });
    let array = [];
    if (getAllData) {
      for (let i = 0; i < getAllData.length; i++) {
        const vendor_id = getAllData[i].vendors;
        const get_vendor_name = await vendorManagementDetails.findOne({
          where: { vendor_management_id: vendor_id },
        });

        obj = {
          vendor_product_details_id: getAllData[i].vendor_product_details_id,
          procurement_product_id: getAllData[i].procurement_product_id,
          product_image: getAllData[i].product_image,
          item_name: getAllData[i].item_name,
          item_code: getAllData[i].item_code,
          unit: getAllData[i].unit,
          priority: getAllData[i].priority,
          mvp: getAllData[i].mvp,
          location: getAllData[i].location,
          state: getAllData[i].state,
          city: getAllData[i].city,
          pin: getAllData[i].pin,
          delivery_address: getAllData[i].delivery_address,
          file: getAllData[i].file,
          remarks: getAllData[i].remarks,
          name: getAllData[i].name,
          department: getAllData[i].department,
          emp_id: getAllData[i].emp_id,
          approvel_status: getAllData[i].approvel_status,
          status: getAllData[i].status,
          end_date: getAllData[i].end_date,
          vendors: getAllData[i].vendors,
          rfp_status: getAllData[i].rfp_status,
          price_amt: getAllData[i].price_amt,
          sgst: getAllData[i].sgst,
          cgst: getAllData[i].cgst,
          igst: getAllData[i].igst,
          delivery_charges: getAllData[i].delivery_charges,
          additional_charges: getAllData[i].additional_charges,
          currency: getAllData[i].currency,
          vendor_remarks: getAllData[i].vendor_remarks,
          vendor_uploaded_document: getAllData[i].vendor_uploaded_document,
          remarks_approvel: getAllData[i].remarks_approvel,
          approvel_vendor: getAllData[i].approvel_vendor,
          final_remarks: getAllData[i].final_remarks,
          checked: getAllData[i].checked,
          is_disabled: getAllData[i].is_disabled,
          vendor_name: get_vendor_name.vendor_name,
        };
        array.push(obj);
      }
      return res
        .status(200)
        .send({ code: 200, message: "Get Successfully", data: array });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////////// approvel Cost api /////////////////////////////

exports.approvel_cost_rejected = async (req, res) => {
  try {
    const procurement_product_id = req.params.id;
    const { final_remarks, approvel_vendor, vendor_product_details_id } =
      req.body;

    if (req.body.vendor_product_details_id) {
      const getData = await vendor_product_Details.findOne({
        where: { vendor_product_details_id: vendor_product_details_id },
      });
      if (getData) {
        const updateData = await vendor_product_Details.update(
          {
            final_remarks,
            approvel_vendor,
          },
          { where: { vendor_product_details_id: vendor_product_details_id } }
        );

        return res.status(200).send({
          code: 200,
          message: "UPdate Successfully",
          data: updateData,
        });
      } else {
        return res.status(403).send({ code: 403, message: "Record Not Found" });
      }
    } else {
      const updateData = await vendor_product_Details.update(
        {
          final_remarks,
          approvel_vendor,
        },
        { where: { procurement_product_id: procurement_product_id } }
      );
      return res
        .status(200)
        .send({ code: 200, message: "UPdate Successfully", data: updateData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};
exports.GetData_vendor_id = async (req, res) => {
  try {
    const vendor_id = req.params.id;
    const getAllData = await vendor_product_Details.findAll({
      where: { vendor_product_details_id: vendor_id },
    });

    if (getAllData) {
      return res
        .status(200)
        .send({ code: 200, message: "Get Successfully", data: getAllData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////////////////////// checked value true //////////////////////
exports.checked_value_ture = async (req, res) => {
  try {
    const vendor_product_details_id = req.params.id;
    const procurement_product_id = req.body.procurement_product_id;

    const getData = await vendor_product_Details.findOne({
      where: { vendor_product_details_id: vendor_product_details_id },
    });
    if (getData) {
      const updateData = await vendor_product_Details.update(req.body, {
        where: { vendor_product_details_id: vendor_product_details_id },
      });
      const getData1 = await vendor_product_Details.findAll({
        where: { procurement_product_id: procurement_product_id },
      });

      if (req.body.checked == true) {
        for (let j = 0; j < getData1.length; j++) {
          if (getData1[j].checked == false) {
            await vendor_product_Details.update(
              {
                is_disabled: true,
              },
              { where: { procurement_product_id: procurement_product_id } }
            );
          }
        }

        for (let i = 0; i < getData1.length; i++) {
          if (getData1[i].checked == true) {
            await vendor_product_Details.update(
              {
                is_disabled: false,
              },
              {
                where: { vendor_product_details_id: vendor_product_details_id },
              }
            );
          }
        }
      } else {
        await vendor_product_Details.update(
          {
            checked: false,
            is_disabled: false,
          },
          { where: { procurement_product_id: procurement_product_id } }
        );
      }

      return res
        .status(200)
        .send({ code: 200, message: "Update Successfully", data: getData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

///////////////////////////////// submit  /////////////////////////////////
exports.invoice_status_update = async (req, res) => {
  try {
    const procurement_product_id = req.params.id;
    const { invoice_date, invoice_remarks, po_status } = req.body;

    var invoice_file =
      req.file.invoice_file == undefined
        ? ""
        : (invoice_file = req.file.invoice_file[0].path);

    function getNuber(min = 1000, max = 500000) {
      min = Math.ceil(min);
      max = Math.floor(max);
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num;
    }

    const getData = await Procurement_productDetails.findOne({
      where: { procurement_product_id: procurement_product_id },
    });

    var invoice_file =
      invoice_file == ""
        ? (invoice_file = getData.invoice_file)
        : (invoice_file = baseUrl + invoice_file);

    if (getData) {
      updateData = await Procurement_productDetails.update(
        {
          invoice_n_o: getNuber(),
          invoice_date,
          invoice_remarks,
          po_status,
          invoice_file: invoice_file,
        },
        { where: { procurement_product_id: procurement_product_id } }
      );
      return res
        .status(200)
        .send({ code: 200, message: "Update Successfully", data: updateData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////////////// Budget approvel api for RBH ///////////////
exports.budget_approvel = async (req, res) => {
  try {
    const department_name = req.params.department_name;
    const GetData = await Department.findOne({
      where: { department_name: department_name },
    });

    if (GetData) {
      updateData = await Department.update(req.body, {
        where: { department_name: department_name },
      });
      return res
        .status(200)
        .send({ code: 200, message: "Update Successfully", data: updateData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

///////////////////////////////// get all budget ///////////////////////////////////
exports.getAll_budget = async (req, res) => {
  try {
    const getAllData1 = await Department.findAll();
    return res.status(200).send({
      code: 200,
      message: "Fetch data Successfully",
      data: getAllData1,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.inventory_Data = async (req, res) => {
  try {
    const getData = await Procurement_productDetails.findAll();

    const filteredData = getData.filter((item) => item.grn_item_n_o !== null);

    const aggregatedData = {};
    var itemDetails;

    filteredData.map((item) => {
      if (aggregatedData[item.item_code]) {
        aggregatedData[item.item_code] += item.grn_item_n_o;
        itemDetails = item;
      } else {
        aggregatedData[item.item_code] = item.grn_item_n_o;
        itemDetails = item;
      }
    });
    const aggregatedArray = Object.keys(aggregatedData).map((item_code) => ({
      item_code,
      total_grn_item_n_o: aggregatedData[item_code],
      ...itemDetails.dataValues,
    }));
    return res.status(200).send({
      code: 200,
      message: "Fetch data and aggregate successfully",
      data: aggregatedArray,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};
///////////////////////// Get RFP Data For Items ///////////////////////////////////
exports.getVendor_replyData = async (req, res) => {
  try {
    const All_id = req.params.id;
    const splitData = All_id.split(",");
    const Rfp_Number = splitData[0];
    const vendors = splitData.slice(1);

    const vendorData = await vendor_product_Details.findAll({
      where: {
        Rfp_Number: Rfp_Number,
        vendors: vendors,
      },
      attributes: ["procurement_product_id"],
    });

    const procurementIds = vendorData.map(data => data.procurement_product_id);

    const getAllData2 = await Procurement_productDetails.findAll({
      where: {
        procurement_product_id: procurementIds,
      },
      attributes: ["procurement_id", "procurement_product_id"],
    });

    const procurementIds2 = getAllData2.map(data => data.procurement_id);

    const getData3 = await ProcurementDetails.findAll({
      where: { procurement_id: procurementIds2 },
      include: [
        {
          model: Procurement_productDetails,
          where: {
            [Op.and]: [
              { status: "ACTIVE" },
              { procurement_product_id: { [Op.in]: procurementIds } },
            ],
          },
          attributes: [
            "item_quantity",
            "priority",
            "mvp",
            "asset_category_id",
            "item_id",
          ],
          include: [
            {
              model: ItemMasterDetails,
              where: { status: "Active" },
              attributes: ["item_code", "item_document", "item_name", "MVP"],
              include: {
                model: AssetDetails,
                where: { status: "Active" },
                attributes: ["asset_category_name"],
              },
            },
          ],
        },
      ],
    });

    return res.status(200).send({
      code: 200,
      message: "Fetch data successfully",
      data: getData3,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//////////////////////////////////////////////////////////////////////////////


//////////////////////////// vendors Data For BOM ////////////////////////////
exports.getVendor_replyData_for_bom = async (req, res) => {
  try {
    const { vendor_id, Rfp_no, type } = req.query;
    const [vendorData] = await vendor_product_Details.findAll({
      where: {
        Rfp_Number: Rfp_no,
        vendors: parseInt(vendor_id),
      },
      attributes: ["procurement_bomItem_id"],
    });

    const getAllData2 = await Procurement_BomItemDetails.findOne({
      where: {
        procurement_bomItem_id: vendorData.procurement_bomItem_id,
      },
      attributes: ["procurement_id"],
    });


    const valueData = await db.procurement.findOne({
      where: {
        procurement_id: getAllData2.procurement_id,
        status: 'ACTIVE',
      },
    });

    const result = await db.sequelize.query(
      `SELECT DISTINCT PB.PR_category,PB.product_name,PB.product_varient,PB.item_quantity,PB.mvp,PB.mvp_product,
      PB.product_quantity,PB.item_id,I.item_code,I.item_document,I.item_name
      FROM procurement_purchase_requests AS P
      INNER JOIN procurement_BomItem_requests AS PB ON PB.procurement_id = P.procurement_id
      INNER JOIN ItemMasters AS I ON I.id= PB.item_id
      INNER JOIN vendor_product_details AS VP ON VP.procurement_bomItem_id=PB.procurement_bomItem_id
      WHERE P.procurement_id=${valueData.procurement_id} AND VP.Rfp_Number= '${Rfp_no}'
      AND VP.vendors=${vendor_id} AND VP.procurement_type ='${type}' AND P.status= "ACTIVE" AND PB.status= "ACTIVE" AND I.status= "ACTIVE"`,
    );

    const Obj = {
      ...valueData.dataValues,
      procurement_BomItem_requests: result[0],
    };

    return res.status(200).send({
      code: 200,
      message: "Fetch data successfully",
      data: Obj,
    });
  } catch (error) {
    return res.status(500).send({ code: 500, message: error.message || "Server Error" });
  }
};

//////////////////////////////////////////////////////////////////////////////


//////////////////////////////// Get RFP Data For Service /////////////////////////////

exports.getVendor_replyData_for_service = async (req, res) => {
  try {
    const { vendor_id, Rfp_no, type } = req.query;
    const [serviceData] = await vendor_product_Details.findAll({
      where: {
        Rfp_Number: Rfp_no,
        vendors: parseInt(vendor_id),
        procurement_type: type
      },
      attributes: ["procurement_service_id", "procurement_id"],
    });

    const valueData = await db.procurement.findOne({
      where: {
        procurement_id: serviceData.procurement_id,
        status: "ACTIVE",
      },
    });
    const result = await db.sequelize.query(
      `SELECT DISTINCT PS.department, PS.PR_category, PS.service_quantity, PS.priority,
      PS.mvp, PS.rfp_status,PS.service_id, VP.Rfp_Number,TS.service_code,TS.service_name,TS.service_description,TS.service_document,
      TS.service_category_id, S.service_category_code,S.service_category_description,S.service_category_name,VP.vendor_product_details_id
      FROM procurement_service_requests AS PS
      INNER JOIN vendor_product_details AS VP ON VP.procurement_service_id=PS.procurement_service_id
      INNER JOIN tbl_servicemaster AS TS ON TS.service_id=PS.service_id
      INNER JOIN ServicesCategories AS S ON S.id= TS.service_category_id
      WHERE VP.procurement_id =${serviceData.procurement_id} AND VP.Rfp_Number= '${Rfp_no}'
      AND VP.vendors=${vendor_id} AND VP.procurement_type ='${type}'  AND PS.status = "Active" AND TS.status = "Active"`
    );

    const Obj = {
      ...valueData.dataValues,
      procurement_serviceItem_requests: result[0],
    };

    if (Obj) {
      return res.status(200).send({ code: 200, message: 'success', data: Obj });
    } else {
      return res.status(404).send({ code: 404, message: 'Data Not Found' });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////
exports.get_Approved_Pr = async (req, res) => {
  try {
    const data = await ProcurementDetails.findAll({
      where: {
        approvel_status: "APPROVED",
      },
    });
    if (data) {
      return res.status(200).send({
        code: 200,
        message: "APPROVED PR's Fetched Successfully",
        data: data,
      });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

///////////////////////// Create RFP Number //////////////////////////////

let lastRfpNumber = 0;

exports.create_Rfp_Number = async (req, res) => {
  try {
    let rfpNumber;

    do {
      lastRfpNumber++;
      rfpNumber = `RFP-${lastRfpNumber}`;

      const existingRfp = await vendor_product_Details.findOne({
        where: {
          Rfp_Number: rfpNumber,
        },
      });

    } while (existingRfp);

    const data = await vendor_product_Details.create({
      Rfp_Number: rfpNumber,
    });

    return res.status(200).send({
      code: 200,
      message: "Unique RFP_Number has been Generated",
      data: rfpNumber,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports.stop_live_rfp = async (req, res) => {
  try {
    const procurement_id = req.params.id;
    const rfp_status = req.body.rfp_status;
    const stop_rfp_date = req.body.stop_rfp_date;

    if (!procurement_id) {
      return res
        .status(400)
        .send({ code: 400, message: "Procurement ID is required" });
    }

    await Procurement_productDetails.update(
      { rfp_status: rfp_status },
      { where: { procurement_id: procurement_id } }
    );
    await Procurement_ServiceDetails.update(
      { rfp_status: rfp_status },
      { where: { procurement_id: procurement_id } }
    );

    await vendor_product_Details.update(
      { stop_Rfp_date: stop_rfp_date, rfp_status: rfp_status },
      { where: { procurement_id: procurement_id } }
    );

    return res
      .status(200)
      .send({ code: 200, message: "RFP stopped successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};
