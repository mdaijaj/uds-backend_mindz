const db = require("../models");
const empDocumentDetail = db.empDocumentDetail;
const empDocumentsChild = db.empDocumentsChild
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
exports.createEmployeeDocument = async (req, res) => {
  try {
    let document_name = req.body.document_name;
    let employee_id = parseInt(req.body.employee_id);
    let document_type = req.body.document_type;
    let status = req.body.status
    let document_file;
    req.file == undefined ? "" : document_file = req.file.path
    let description = req.body.description;
    const Data = await empDocumentDetail.create({
      employee_id: employee_id,
      document_file: baseUrl+document_file,
      document_type: document_type,
      document_name: document_name,
      description: description,
      status: status
    });
    res.status(200).send({ Code: 200, status: "success", message: "User Document Uploaded", data: Data, });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.updateEmployeeDocument = async (req, res) => {
  const emp_document_Id = parseInt(req.params.emp_document_Id);
  let document_type = req.body.document_type;
  let document_name = req.body.document_name;
  let description = req.body.description;
  let document_file;
  req.file == undefined ? "" : document_file = req.file.path
  try {
    const userDetails = await empDocumentDetail.findOne({ where: { emp_document_Id: parseInt(req.params.emp_document_Id) } });
    if (userDetails) {
      const employData = await empDocumentDetail.update(
        {
          document_type: document_type,
          document_name: document_name,
          description: description,
          document_file: baseUrl+document_file

        }, { where: { emp_document_Id: parseInt(req.params.emp_document_Id) } });
      return res.status(200).send({ message: "User Data Updated Successfully.", data: employData });
    } else {
      return res.status(400).send({ code: 400, message: "Invalid employee_Id..." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.createEmployeeDocumentChild = async (req, res) => {
  try {
    let document_name = req.body.document_name;
    let document_type = req.body.document_type;
    let document_file;
    req.file == undefined ? "" : document_file = req.file.path
    let description = req.body.description;
    const Data = await empDocumentsChild.create({
      document_file: baseUrl+document_file,
      document_type: document_type,
      document_name: document_name,
      description: description,
    });
    return res.status(200).send({ Code: 200, status: "success", message: "FIle Document uploaded", data: Data, });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};