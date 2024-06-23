const db = require("../models/index");
const leaveTypesDetails = db.leaveTypes;
const op = db.sequelize.op;


/////////////// Create Leave Types Master ///////////////

// exports.create_Leave_Types = async (req, res) => {
//     try {
//         const { leave_type, number_of_leave, is_carry_forward } = req.body;
//         const leaveData = await leaveTypesDetails.findOne({ where: { leave_type: leave_type } });
//         if (leaveData) {
//             return res.status(403).send({ code: 403, message: "leave Type is Already Exits!" });
//         } else {
//             const response = await leaveTypesDetails.create({
//                 leave_type,
//                 number_of_leave,
//                 is_carry_forward
//             });
//             return res.status(200).send({ code: 200, message: "Created Successfully!", data: response })
//         };
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };

exports.createLeaveTypes = async (req, res) => {
    try {
        const { leave_type, number_of_leave, is_carry_forward } = req.body;
        const leave = await leaveTypesDetails.findOne({ where: { leave_type: leave_type , isDeleted:false } });
        if (leave) {
            return res.status(201).send({ code: 201, message: "Leave Type is Already Exits!" });        
        }
        if (is_carry_forward) {
            let monthLeave = number_of_leave / 12
            const response = await leaveTypesDetails.create({
                leave_type,
                number_of_leave,
                is_carry_forward,
                leave_in_month: monthLeave
            });
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: response })
        } else {
            const response = await leaveTypesDetails.create({
                leave_type,
                number_of_leave,
                is_carry_forward,
                leave_in_month: 0
            });
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: response })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Leave Types ///////////////

exports.editLeaveTypes = async (req, res) => {
    try {
        const leaveTypeId = req.params.id;
        const { leave_type } = req.body;
        const leaveData = await leaveTypesDetails.findOne({ where: { leave_id: leaveTypeId } });
        if (leaveData) {
            const leave_typee = await leaveTypesDetails.findAll({ where: { leave_type: leave_type } });
            if (leave_typee[0]) {
                return res.status(409).send({ code: 409, message: "Leave Type is Already Exits!" });
            } else {
                const updateData = await leaveTypesDetails.update(req.body, { where: { leave_id: leaveTypeId } });
                return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
            }
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////// Update Leave Type /////////////
exports.update_leavetypeStatus = async (req, res) => {
    try {
        const leave_id = parseInt(req.params.id);
        const { status } = req.body;
        const editData = await leaveTypesDetails.findOne({ where: { leave_id: leave_id } });
        if (editData) {
            const updateData = await leaveTypesDetails.update(
                {
                    status
                }, { where: { leave_id: leave_id } }
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

/////////////// Get All Leave Types ///////////////

exports.getAllLeaveTypes = async (req, res) => {
    try {
        const getAllData = await leaveTypesDetails.findAll({ where: { isDeleted: false }, order: [['leave_id', 'DESC']], })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Leave Types ///////////////

exports.getByIdLeaveTypes = async (req, res) => {
    try {
        const leaveTypeId = req.params.id;
        const getData = await leaveTypesDetails.findOne({ where: { leave_id: leaveTypeId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Leave Types ///////////////

exports.deleteLeaveTypes = async (req, res) => {
    try {
        const leaveTypeId = req.params.id;
        const dltleaveData = await leaveTypesDetails.findOne({ where: { leave_id: leaveTypeId } });
        if (dltleaveData) {
            const deleteData = await leaveTypesDetails.destroy({ where: { leave_id: leaveTypeId } });
            return res.status(200).send({ code: 200, message: "leave Type Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};