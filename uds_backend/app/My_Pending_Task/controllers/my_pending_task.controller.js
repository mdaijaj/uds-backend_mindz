const db = require("../../models/index");
const myPendingTaskDetails = db.myPendingTask
const Op = db.Sequelize.Op;

/////////////// Create My Pending Task ///////////////

exports.create_My_Pending_Task = async (req, res) => {
    try {
        const { subject, due_date, status_task, priority, related_to, task_name, task_owner, task_assign_to, assigney_action, supporting_document, system_ip, browser, } = req.body;
        const response = await myPendingTaskDetails.create({
            subject,
            due_date,
            status_task,
            priority,
            related_to,
            task_name,
            task_owner,
            task_assign_to,
            assigney_action,
            supporting_document,
            system_ip,
            browser
        });
        return res.status(200).send({ code: 200, message: "My Pending Task Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit My Pending Task ///////////////

exports.edit_My_Pending_task = async (req, res) => {
    try {
        const myPendingTaskId = req.params.id;
        const { subject, due_date, status_task, priority, related_to, task_name, task_owner, task_assign_to, assigney_action, supporting_document, system_ip, browser, } = req.body;
        const editData = await myPendingTaskDetails.findOne({ where: { pending_task_id: myPendingTaskId } });
        if (editData) {
            var updateData = await myPendingTaskDetails.update({
                subject,
                due_date,
                status_task,
                priority,
                related_to,
                task_name,
                task_owner,
                task_assign_to,
                assigney_action,
                supporting_document,
                system_ip,
                browser
            }, { where: { pending_task_id: myPendingTaskId } });
            return res.status(200).send({ code: 200, message: "Updated Successfully", result: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById My Pending Task ///////////////

exports.getById_My_Pending_task = async (req, res) => {
    try {
        const myPendingTaskId = req.params.id;
        const getData = await myPendingTaskDetails.findOne({ where: { pending_task_id: myPendingTaskId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", result: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All My Pending Task ///////////////

exports.get_All_My_Pending_task = async (req, res) => {
    try {
        const getAllData = await myPendingTaskDetails.findAll();
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All My Pending Task Data Successfully", result: getAllData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete My Pending Task ///////////////

exports.delete_My_Pending_task = async (req, res) => {
    try {
        const myPendingTaskId = req.params.id;
        const dltData = await myPendingTaskDetails.findOne({ pending_task_id: myPendingTaskId })
        if (dltData) {
            const updateData = await myPendingTaskDetails.update({ status: "INACTIVE" },{pending_task_id: myPendingTaskId})
            return res.status(200).send({code: 200, message: "My Pending Task Deleted Data Successfully"})
        } else {
            return res.status(404).send({code: 404, message: "Record Not Found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}