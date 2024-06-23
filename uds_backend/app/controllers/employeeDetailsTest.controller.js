const db = require("../models/index");
const EmployeePreviousEmployer = db.tableName;
const Op = db.Sequelize.Op;

exports.createEmployeePreviousEmployer = async (req, res) => {
  try {
    const { empId, companyName, position, formDate, toDate, lastDrawnSalary, reasonOfLeaving, location } = req.body
    const employeedatas = await EmployeePreviousEmployer.create({
      companyName,
      position,
      formDate,
      toDate,
      lastDrawnSalary,
      reasonOfLeaving,
      location,
      empId
    })
    return res.status(200).send({ code: 200, message: "Create Successfully!", data: employeedatas })
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.employeePreviousEmployerList = async (req, res) => {
  try {
    const employeedata = await EmployeePreviousEmployer.findAll({ where: { status: 'ACTIVE' } })
    if (employeedata) {
      res.status(200).send({ code: 200, message: "get all EmployeePreviousEmployers list", data: employeedata })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.employeePreviousEmployerListById = async (req, res) => {
  try {
    const employeedata = await EmployeePreviousEmployer.findAll({
      where: { employee_id: parseInt(req.params.employee_id), status: 'ACTIVE' }
    })
    if (employeedata) {
      res.status(200).send({ code: 200, message: "get all EmployeePreviousEmployers list", data: employeedata })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.employeePreviousEmployerUpdate = async (req, res) => {
  try {
    const employeeDetails = await EmployeePreviousEmployer.findOne({ where: { employee_id: req.params.employee_id } })
    if (employeeDetails) {
      const employeeData = await EmployeePreviousEmployer.update(req.body, {
        where: { employee_id: req.params.employee_id }
      })
      return res.status(200).send({ code: 200, message: "EmployeePreviousEmployer Updated Successfully!", data: employeeData })
    } else {
      return res.status(403).send({ code: 403, message: "Invalid empId..." })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.employeePreviousEmployerDeleted = async (req, res) => {
  const empId = req.params.id;
  try {
    const employeeDetails = await EmployeePreviousEmployer.findOne({ where: { id: empId } })
    if (employeeDetails) {
      const employeeData = await EmployeePreviousEmployer.update({ status: "INACTIVE" }, { where: { id: empId } })
      return res.status(200).send({ code: 200, message: "EmployeePreviousEmployer Data is Deleted Successfully!" });
    } else {
      return res.status(403).send({ code: 403, message: "Invalid empId..." })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}
