const db = require("../../../models/index");
const roleMasterDetails = db.role_master;
const op = db.sequelize.op;

exports.createroleMaster = async (req, res) => {
    try {
        const { role_master_name} = req.body;
        const role_masterData = await roleMasterDetails.findOne({ where: { role_master_name: role_master_name, status:"ACTIVE"} });   
        if (role_masterData) {
            return res.status(403).send({ code: 403, message: "Role Master Name is Already Exits!" });
        } 
        const response = await roleMasterDetails.create({
                role_master_name
            });
            return res.status(200).send({ code: 200, message: "Role Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllroleMaster = async (req, res) => {
    try {
        const role_master_name = req.params.role_name;
        const getAllData = await roleMasterDetails.findAll({
            where: { status: "ACTIVE" },
        })
        if(role_master_name =="Super Admin") {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        }else {
            getData = getAllData.filter((role_master_name) => role_master_name.role_master_name !== "Super Admin");
            return res.status(200).send({code: 200, message: "Fetch All Data Successfully",data: getData });
        };
    }catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetById roleMaster ///////////////

exports.getByIdroleMaster = async (req, res) => {
    try {
        const roleMasterId = parseInt(req.params.role_master_id);
        const getData = await roleMasterDetails.findOne({ where: { role_master_id: roleMasterId} , status:"ACTIVE"});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// UPDATE roleMaster ///////////////

exports.editroleMaster = async (req, res) => {
    try {
        const roleMasterId = parseInt(req.params.role_master_id);
        const { role_master_name,branch_id } = req.body;
        const role_masterData = await roleMasterDetails.findOne({ where: { role_master_name: roleMasterId} });   
        const response = await roleMasterDetails.update({
                role_master_name,branch_id
            } , { where: { role_master_id: parseInt(req.params.role_master_id) } });
            return res.status(200).send({ code: 200, message: "Role Updated Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete roleMaster ///////////////

exports.deleteroleMaster = async (req, res) => {
    try {
        const roleMasterId = parseInt(req.params.role_master_id);
        const dltroleMaster = await roleMasterDetails.findOne({ where: { role_master_id: roleMasterId } });
        if (dltroleMaster) {
            const deleteData = await roleMasterDetails.update({ status: "INACTIVE" }, { where: { role_master_id: roleMasterId } });
            return res.status(200).send({ code: 200, message: "Role Master Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getByBranchIdroleMaster = async (req, res) => {
    try {
        const branchId = parseInt(req.params.branch_id);
        const getData = await db.user.findAll({ where: { branch_id: branchId} , status:"ACTIVE"});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by Branch ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getRoleMasterByBranchId = async (req, res) => {
    try {
        const branchId = parseInt(req.params.branch_id);
        const getData = await roleMasterDetails.findAll({ where: { branch_id: branchId}});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by Branch ID Successfully", data: getData });
        } else {
            return res.status(200).send({ code: 200, message: "Record Not Found , ",data: [] });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getEmployeesByRoleId = async (req, res) => {
    try {
        const roleId = parseInt(req.params.role_id);
        const getData = await db.user.findAll({ where: { role_master_id: roleId}});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by role ID Successfully", data: getData });
        } else {
            return res.status(200).send({ code: 200, message: "Record Not Found , ",data: [] });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};