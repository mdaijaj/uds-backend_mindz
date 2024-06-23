const db = require("../models/index");
const bankNameDetails = db.bankName;

/////////////// Create Bank ///////////////

exports.createBank = async (req, res) => {
  try {
    const { bank_name } = req.body
    const bankData = await bankNameDetails.findOne({ where: { bank_name: bank_name } });
    if (bankData) {
      return res.status(403).send({ code: 403, message: "Bank Name is Already Exits!" });
    } else {
      const response = await bankNameDetails.create({
        bank_name
      });
      return res.status(200).send({ code: 200, message: "Bank Name Created Successfully!", data: response })
    };
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// Edit Bank ///////////////

exports.editBank = async (req, res) => {
  try {
    const bankId = req.params.id;
    const editData = await bankNameDetails.findOne({ where: { bank_id: bankId } });
    if (editData) {
      const updateData = await bankNameDetails.update(req.body, { where: { bank_id: bankId } });
      return res.status(200).send({ code: 200, message: "Bank Name Updated Successfully", data: updateData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// Get All Bank ///////////////

exports.getAllBank = async (req, res) => {
  try {
    const getAllData = await bankNameDetails.findAll({ where: { status: 'ACTIVE' } })
    if (getAllData) {
      return res.status(200).send({ code: 200, message: "Fetch All Bank Name Data Successfully", data: getAllData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// Get ById Bank ///////////////

exports.getByIdBank = async (req, res) => {
  try {
    const bankId = req.params.id;
    const getData = await bankNameDetails.findOne({ where: { bank_id: bankId } });
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

/////////////// Delete Bank ///////////////

exports.deleteBank = async (req, res) => {
  try {
    const bankId = req.params.id;
    const dltbank = await bankNameDetails.findOne({ where: { bank_id: bankId } });
    if (dltbank) {
      const deleteData = await bankNameDetails.update({ status: "INACTIVE" }, { where: { bank_id: bankId } });
      return res.status(200).send({ code: 200, message: "Bank Name Data is Deleted Successfully!", data: deleteData });
    } else {
      return res.status(403).send({ code: 403, message: "Recorb Not Found" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};