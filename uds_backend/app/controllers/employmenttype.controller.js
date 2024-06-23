const { log } = require("mathjs");
const db = require("../models/index");
const EmploymentType = db.employmenttype;

const Op = db.Sequelize.Op;


exports.createEmployment = async (req, res) => {
  try {
    const { emptype_name } = req.body;
    const emptype = await EmploymentType.findOne({ where: { emptype_name: emptype_name ,isDeleted:false} });
    if (emptype) {
        return res.status(201).send({ code: 201, message: "Employment Type is Already Exits!" });
    }
    const employData = await EmploymentType.create({
      emptype_name
    })
    return res.status(200).send({
      message: "create successfully!", data: employData
    })
  }
  catch (err) {
    res.status(500).send({
      code: 500, message: "Server Error"
    });
  }
}


exports.employmentList = async (req, res) => {
  try {
    const employData = await EmploymentType.findAll({
      where: { isDeleted: false },
      attributes: ['emptype_id', 'emptype_name', 'status'],
      order: [['emptype_id', 'DESC']],
    })
    if (employData) {
      res.status(200).send({ message: "get all employData list", data: employData })
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}

exports.employmentDetails = async (req, res) => {
  const employId = parseInt(req.params.emptype_id);
  try {
    const employData = await EmploymentType.findAll({
      where: { emptype_id: employId }
    })
    if (employData) {
      res.status(200).send({ message: "get region details success", data: employData })
    }
  } catch (err) {
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.employmentUpdate = async (req, res) => {
  try {
    const employId = parseInt(req.params.emptype_id);
    const { emptype_name } = req.body;
    console.log(req.body, "serea body")
    const employmentDetails = await EmploymentType.findOne({ where: { emptype_id: employId } })
    if (employmentDetails) {
      const employetypenamee = await EmploymentType.findAll({ where: { emptype_name: emptype_name } });
      if (employetypenamee[0]) {
        return res.status(409).send({ code: 409, message: "Employment Type is Already Exits!" });
      } else {
        const employData = await EmploymentType.update(req.body, {
          where: { emptype_id: employId }
        })
        return res.status(200).send({ code: 200, message: "Update successfully!", data: employData })
      }
    }
    else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (err) {
    res.status(500).send({ code: 500, message: "Server Error" })
  }
}

exports.update_employmentStatus = async (req, res) => {
  try {
      const emptype_id = req.params.emptype_id;
      const { status } = req.body;
      const editData = await EmploymentType.findOne({ where: { emptype_id: emptype_id } });
      if (editData) {
          const updateData = await EmploymentType.update(
              {
                  status
              }, { where: { emptype_id: emptype_id } }
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

exports.employmentDeleted = async (req, res) => {
  const employId = parseInt(req.params.emptype_id);
  try {
    const employmentDetails = await EmploymentType.findOne({ where: { emptype_id: employId } })
    if (employmentDetails) {
      await EmploymentType.update({ isDeleted: true }, {
        where: { emptype_id: employId }
      })
      return res.status(200).send({
        message: "Data is deleted successfully!"
      });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  }
  catch (err) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}