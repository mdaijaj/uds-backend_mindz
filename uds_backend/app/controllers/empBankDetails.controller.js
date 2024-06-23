const db = require("../models");
const empBankDetail = db.empBankDetail
const User = db.user

const Op = db.Sequelize.Op;

exports.createEmpBankDetail = async (req, res) => {
  const { bank_name, empbank_id, emp_name_in_bank, branch_address, account_number, ifsc_code, pf_number, uan_number, employee_id, status } = req.body
  try {
    const userExits = await empBankDetail.findOne({ where: { employee_id: employee_id } })
    if (userExits) {
      return res.status(403).send({ code: 403, message: "Employee Bank Details Already Exits!" })
    } else if (!userExits) {
      const employeeBankDetail = await empBankDetail.create({
        bank_name,
        emp_name_in_bank,
        branch_address,
        account_number,
        ifsc_code,
        pf_number,
        uan_number,
        employee_id,
        empbank_id,
        status
      })
      return res.status(200).send({ code: 200, message: "Create Successfully!", data: employeeBankDetail })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

exports.updateEmpBankDetail = async (req, res) => {
  const { bank_name, emp_name_in_bank, branch_address, account_number, ifsc_code, pf_number, uan_number, empbank_id } = req.body;
  const employee_id = parseInt(req.params.employee_id);
  try {

    const bankdata = await User.findOne({ where: { employee_id: employee_id } })
    if (bankdata) {
      const userDetails = await User.update(
        {
          bank_name: bank_name,
          employee_name_in_bank: emp_name_in_bank,
          bank_address: branch_address,
          account_number: account_number,
          ifsc_code: ifsc_code,
          pf_number: pf_number,
          UAN_number: uan_number,
          empbank_id: empbank_id
        }, { where: { employee_id: parseInt(req.params.employee_id) } });
        return res.status(200).send({ code: 200, message: "Data update Successfully", data: userDetails });
    }
    else {
      return res.status(200).send({ status: 404, message: "No data found" });
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
   
};

exports.getByIdEmpBankDetail = async (req, res) => {
  const employee_id = parseInt(req.params.employee_id);
  try {
    const getAllData = await User.findOne({ where: { employee_id: employee_id } });
    if (getAllData) {
      return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
    } else {
      return res.status(404).send({ message: "Record Not Found" });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
}