const db = require("../../../models/index");
const facilityDetails = db.Facility_Remote;
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";


/////////////// Create Facility Remote ///////////////

exports.create_Facility_Remote = async (req, res) => {
    try {
        const { facility_type, initiated_date, person_name, location, repair, type_of_request, description, agreement_signed_date,
            closed_date, facility, complaints_status } = req.body;

        var upload_documents = req.files.upload_documents_copy == undefined ? "" : upload_documents = req.files.upload_documents_copy[0].path;
        var upload_vendor = req.files.upload_vendor_copy == undefined ? "" : upload_vendor = req.files.upload_vendor_copy[0].path;
        var upload_comparative = req.files.upload_comparative_copy == undefined ? "" : upload_comparative = req.files.upload_comparative_copy[0].path;
        var upload_sign = req.files.upload_sign_copy == undefined ? "" : upload_sign = req.files.upload_sign_copy[0].path;

        const response = await facilityDetails.create({
            facility_type,
            initiated_date,
            person_name,
            location,
            repair,
            type_of_request,
            description,
            upload_documents_copy: baseUrl + upload_documents,
            upload_vendor_copy: baseUrl + upload_vendor,
            upload_comparative_copy: baseUrl + upload_comparative,
            upload_sign_copy: baseUrl + upload_sign,
            agreement_signed_date,
            closed_date,
            facility,
            complaints_status
        });
        return res.status(200).send({ code: 200, message: "Facility Remote Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Facility Remote ///////////////

exports.edit_Facility_Remote = async (req, res) => {
    try {
        const facilityId = req.params.id;
        const { facility_type, initiated_date, person_name, location, repair, type_of_request, description, agreement_signed_date,
            closed_date, facility, complaints_status, remort_status } = req.body;

        var upload_documents = req.files.upload_documents_copy == undefined ? "" : upload_documents = req.files.upload_documents_copy[0].path;
        var upload_vendor = req.files.upload_vendor_copy == undefined ? "" : upload_vendor = req.files.upload_vendor_copy[0].path;
        var upload_comparative = req.files.upload_comparative_copy == undefined ? "" : upload_comparative = req.files.upload_comparative_copy[0].path;
        var upload_sign = req.files.upload_sign_copy == undefined ? "" : upload_sign = req.files.upload_sign_copy[0].path;

        const editData = await facilityDetails.findOne({ where: { facility_id: facilityId } });
        if (editData) {
            const updateData = await facilityDetails.update({
                facility_type,
                initiated_date,
                person_name,
                location,
                repair,
                type_of_request,
                description,
                upload_documents_copy: baseUrl + upload_documents,
                upload_vendor_copy: baseUrl + upload_vendor,
                upload_comparative_copy: baseUrl + upload_comparative,
                upload_sign_copy: baseUrl + upload_sign,
                agreement_signed_date,
                closed_date,
                facility,
                complaints_status,
                remort_status
            }, { where: { facility_id: facilityId } });
            return res.status(200).send({ code: 200, message: "Facility_Remote Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Facility Remote ///////////////

exports.upate_Facility_Type_Remote_Status = async (req, res) => {
    try {
        const facilityId = req.params.id;
        const editData = await facilityDetails.findOne({ where: { facility_id: facilityId } });
        if (editData) {
            const updateData = await facilityDetails.update({ facility_type: req.body.facility_type }, { where: { facility_id: facilityId } });
            return res.status(200).send({ code: 200, message: "Facility_Remote Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Facility Remote ///////////////

exports.get_ById_Facility_Remote = async (req, res) => {
    try {
        const facilityId = req.params.id;
        const getData = await facilityDetails.findOne({ where: { facility_id: facilityId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Facility_Remote data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Facility Remote ///////////////

exports.get_All_Facility_Remote = async (req, res) => {
    try {
        const getData = await facilityDetails.findAll({ where: { status: "ACTIVE" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Facility_Remote Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Open Facility Remote ///////////////

exports.get_All_Open_Facility_Remote = async (req, res) => {
    try {
        const getData = await facilityDetails.findAll({ where: { facility_type: "Open" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Facility_Remote Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Requested Facility Remote ///////////////

exports.get_All_Requested_Facility_Remote = async (req, res) => {
    try {
        const getData = await facilityDetails.findAll({ where: { facility_type: "Request" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Facility_Remote Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Complaint List Facility Remote ///////////////

exports.get_All_Complaint_List_Facility_Remote = async (req, res) => {
    try {
        const getData = await facilityDetails.findAll({ where: { facility_type: "Compliant" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Facility_Remote Data Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Facility Remote ///////////////

exports.delete_Facility_Remote = async (req, res) => {
    try {
        const facilityId = req.params.id;
        const deleteData = await facilityDetails.findOne({ where: { facility_id: facilityId } });
        if (deleteData) {
            const dltData = await facilityDetails.update({ status: "INACTIVE" }, { where: { facility_id: facilityId } });
            return res.status(200).send({ code: 200, message: "Facility_Remote is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Remote Status Open ///////////////

exports.get_All_Remote_Status_Open = async (req, res) => {
    try {
        const find_Open = await facilityDetails.findAll({ where: { remort_status: "OPEN" } })
        let open_length = find_Open.length;
        if (find_Open.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Remote Status Open Data Successfully!", data: open_length })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}

/////////////// Get All Remote Status Closed ///////////////

exports.get_All_Remote_Status_Closed = async (req, res) => {
    try {
        const find_Closed = await facilityDetails.findAll({ where: { remort_status: "CLOSED" } })
        let closed_lengeth = find_Closed.length;
        if (find_Closed.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Remote Status Closed Data Successfully!", data: closed_lengeth })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}

/////////////// Get All Remote Status Rejected ///////////////

exports.get_All_Remote_Status_Rejected = async (req, res) => {
    try {
        const find_Rejected = await facilityDetails.findAll({ where: { remort_status: "REJECTED" } })
        let rejected_length = find_Rejected.length;
        if (find_Rejected.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Remote Status Rejected Data Successfully!", data: rejected_length })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}