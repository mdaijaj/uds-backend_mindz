const db = require("../../../models/index");
const Department = db.department;
const Procurement_productDetails = db.procurement_product;

exports.createDepartment = async (req, res) => {
    try {
        const { department_name} = req.body;
        const department_code = btoa(Math.random()).slice(0, 10).toUpperCase();
        const department = await Department.findOne({ where: { department_name: department_name, isDeleted: false } });
        
        if (department) {
            return res.status(201).send({ code:201, message: "Department Name is Already Exits!" });
        }
        const response = await Department.create({
            department_name, department_code
        });
        return res.status(200).send({ code: 200, message: "Department Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllDepartment = async (req, res) => {
    try {
        const getAllData = await Department.findAll({ where: { isDeleted: false },order: [['dept_id','DESC']] })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Department Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.getAllActiveDepartment = async (req, res) => {
    try {
        const getAllData = await Department.findAll({ where: { isDeleted: false , status : 'ACTIVE' },order: [['dept_id','DESC']] })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Department Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.getByIdDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id
        const getAllData = await Department.findOne({ where: { dept_id: departmentId } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch Department Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.updateDepartmentStatus = async (req, res) => {
    try {
        const dept_id = req.params.departmentId;
        const { status } = req.body;
        const editData = await Department.findOne({ where: { dept_id: dept_id } });
        if (editData) {
            const updateData = await Department.update(
                {
                    status
                }, { where: { dept_id: dept_id } }
            );
            return res.status(200).send({ code: 200, message: "Status Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


exports.getAllDepartment_pro = async (req, res) => {
    try {
        const Department_Details = await Department.findAll()
        let total_mvp = 0;
        for (let i = 0; i < Department_Details.length; i++) {
            let dept_name = Department_Details[i].department_name;
            const Precurement_Details = await Procurement_productDetails.findAll({ where: { department: dept_name, po_status: "PAID" } });
            for (let i = 0; i < Precurement_Details.length; i++) {
                total_mvp += Precurement_Details[i].mvp;
            }
            let Remaining_Buget = Department_Details[i].budget_amount - total_mvp;
            let department_wise_po = total_mvp;
            let remaining_budget_amount = Remaining_Buget;
            if (Precurement_Details[i] == undefined) {
                const Update_Buget = await Department.update({ department_wise_po: 0, remaining_budget_amount: 0 }, { where: { department_name: dept_name } })
            } else {
                const Update_Buget = await Department.update({ department_wise_po, remaining_budget_amount }, { where: { department_name: dept_name } })
            }
        }
        if (Department_Details) {
            const Get_data = await Department.findAll()
            return res.status(200).send({ code: 200, message: "Budget Updated Successfully", data: Get_data });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.deleteDepartment = async (req, res) => {
    try {
        const dept_id = parseInt(req.params.dept_id);
        const dltStage = await Department.findOne({ where: { dept_id: dept_id } });
        if (dltStage) {
            const deleteData = await Department.update({ isDeleted : true }, { where: { dept_id: dept_id } });
            return res.status(200).send({ code: 200, message: "Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.editDepartment = async (req, res) => {
    try {
        const dept_id = parseInt(req.params.dept_id);
        const {department_name}= req.body;
        const departmentt = await Department.findOne({ where: { dept_id: dept_id } });
        if (departmentt) {
            const departmentt_name = await Department.findAll({ where: { department_name: department_name } 
            });
            if (departmentt_name[0]) {
                return res.status(409).send({ code: 409, message: "Department Already Exists" });
            } else {
                const updateData = await Department.update(req.body, { where: { dept_id: dept_id } });
                return res.status(200).send({ code: 200, message: "Data is Update Successfully!", data: updateData });
            }
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.calculate_Buget = async (req, res) => {
    try {
        const { department_name } = req.body;
        const Precurement_Details = await Procurement_productDetails.findAll({ where: { department: department_name } });
        const Department_Details = await Department.findOne({ where: { department_name: department_name } })
        let total_mvp = 0;
        for (let i = 0; i < Precurement_Details.length; i++) {
            total_mvp += Precurement_Details[i].mvp;
        }
        let Remaining_Buget = Department_Details.budget_amount - total_mvp;
        let department_wise_po = total_mvp;
        let remaining_budget_amount = Remaining_Buget;
        let obj = {
            "department_wise_po": department_wise_po,
            "remaining_budget_amount": remaining_budget_amount
        }
        if (Department_Details) {
            const Update_Buget = await Department.update({ department_wise_po, remaining_budget_amount }, { where: { department_name: department_name } })
            res.status(200).send({ code: 200, message: "Budget updated successfully", data: obj })
        } else {
            res.status(404).send({ code: 404, message: "Department not found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}
