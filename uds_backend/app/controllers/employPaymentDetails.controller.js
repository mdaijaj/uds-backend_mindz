const db = require("../models/index");
const paymentDetails = db.paymentDetails;
const Op = db.Sequelize.Op;


exports.createEmploymentPaymentDetails = async (req, res) => {
  const { name, companyName, bankName, bankAddress, accountNumber, ifscCode, pfNumber, uanNumber, status } = req.body;
  try {
    const employData = await paymentDetails.create({
      name,
      companyName,
      bankName,
      bankAddress,
      accountNumber,
      ifscCode,
      pfNumber,
      uanNumber,
      status
    })
    return res.status(200).send({ code: 200, message: "Create Successfully!", data: employData })
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}