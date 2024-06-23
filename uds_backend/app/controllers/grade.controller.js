const db = require("../models/index");
const Grade = db.grade;
const Op = db.Sequelize.Op;


exports.createGrade = async (req, res) => {
  try {
    const { grade_name } = req.body;
    const grade = await Grade.findOne({ where: { grade_name: grade_name , isDeleted : false } });
    if (grade) {
        return res.status(201).send({ code: 201, message: "Grade is Already Exits!" });
    }
    const gradeData = await Grade.create({
      grade_name
    })
    return res.status(200).send({ code: 200, message: "Created Successfully", data: gradeData })
  }
  catch (err) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.gradeList = async (req, res) => {
  try {
    const gradeData = await Grade.findAll({
      where: { isDeleted: false },
      attributes: ['grade_id', 'grade_name', 'status'],
      order: [['grade_id', 'DESC']],
    })
    if (gradeData) {
      res.status(200).send({ message: "get all gradeData list", data: gradeData })
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.gradeDetails = async (req, res) => {
  const grade_id = parseInt(req.params.grade_id);
  try {
    const gradeData = await Grade.findAll({
      where: { grade_id: grade_id },
      attributes: ['grade_id', 'grade_name', 'status'],
    })
    if (gradeData) {
      res.status(200).send({ message: "gradeData details successfully.", data: gradeData })
    }
  } catch (err) {
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.gradeUpdate = async (req, res) => {
  try {
    const roleId = parseInt(req.params.grade_id);
    const { grade_name } = req.body;
    const gradeDetails = await Grade.findOne({ where: { grade_id: roleId } })
    if (gradeDetails) {
      const grade_namee = await Grade.findAll({ where: { grade_name: grade_name } });
      if (grade_namee[0]) {
        return res.status(409).send({ code: 409, message: "Grade is Already Exits!" });
      } else {
        const gradeData = await Grade.update(req.body, {
          where: { grade_id: roleId }
        })
        return res.status(200).send({ message: "Grade updated successfully.", data: gradeData })
      }
    }
    else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (err) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

exports.update_GradeStatus = async (req, res) => {
  try {
      const gradeId = parseInt(req.params.grade_id);
      const { status } = req.body;
      const editData = await Grade.findOne({ where: { grade_id: gradeId } });
      if (editData) {
          const updateData = await Grade.update(
              {
                  status
              }, { where: { grade_id: gradeId } }
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

exports.gradeDeleted = async (req, res) => {
  const gradeId = parseInt(req.params.grade_id);
  try {
    const gradeDetails = await Grade.findOne({ where: { grade_id: gradeId } })
    if (gradeDetails) {
      const gradeData = await Grade.update({ isDeleted: true }, {
        where: { grade_id: gradeId }
      });
      return res.status(200).send({ code: 200, message: "Data is Deleted Successfully!", data: gradeData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  }
  catch (err) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}