const db = require("../models");
const prevEmpDetail = db.prevEmpDetail;
const empFamilyDetails = db.empFamilyDetails;
const userDetails = db.user;
const empBankDetail = db.empBankDetail;
const vertical = db.verticals
const jobTypes = db.jobTypes
const jobsdata = db.jobs
const empDocumentDetail = db.empDocumentDetail;

/////////////// Create Employee Family Detail ///////////////

exports.createEmployeeFamilyDetail = async (req, res) => {
  try {
    let results = [];
    for (let i = 0; i < req.body.length; i++) {
      var ObjEmployee = {
        family_member_name: req.body[i].family_member_name,
        date_of_birth: req.body[i].date_of_birth,
        relation: req.body[i].relation,
        contact_number: req.body[i].contact_number,
        employee_id: req.body[i].employee_id,
        remark: req.body[i].remark,
      };
      var employeedatas = await empFamilyDetails.create(ObjEmployee);
      results.push(employeedatas);
    }
    return res.status(200).send({ code: 200, message: "Create Successfully!", data: results });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Update Family Details ///////////////

exports.updateFamilyDetails = async (req, res) => {
  try {
    let employee_id = parseInt(req.params.employId);
    let results = [];
    for (let i = 0; i < req.body.length; i++) {
      var ObjEmployee = {
        family_member_name: req.body[i].family_member_name,
        date_of_birth: req.body[i].date_of_birth,
        relation: req.body[i].relation,
        contact_number: req.body[i].contact_number,
        remark: req.body[i].remark,
      };
      if (req.body[i].family_id) {
        familyUpdateData = await empFamilyDetails.update(ObjEmployee, {
          where: { employee_id: employee_id, family_id: parseInt(req.body[i].family_id) }
        });
      }
      results.push(familyUpdateData);
    }
    return res.status(200).send({ code: 200, message: "Update Successfully!", data: results });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Create Emp Prev Detail ///////////////

exports.createEmpPrevDetail = async (req, res) => {
  try {
    let results = [];
    for (let i = 0; i < req.body.length; i++) {
      var ObjEmployee = {
        company_name: req.body[i].company_name,
        position: req.body[i].position,
        from_date: req.body[i].from_date,
        to_date: req.body[i].to_date,
        employee_id: req.body[i].employee_id,
        last_drawn_salary: req.body[i].last_drawn_salary,
        location: req.body[i].location,
        reson_of_leaving: req.body[i].reson_of_leaving,
      };
      const employeedata = await prevEmpDetail.create(ObjEmployee);
      results.push(employeedata);
    }
    return res.status(200).send({ code: 200, message: "Create Employee Preview Detail Successfully!", data: results });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Update Emp Details ///////////////

exports.updateEmpDetails = async (req, res) => {
  let employee_id = parseInt(req.params.employId);
  const { title, employee_code, first_name, middle_name, last_name, gender, emplyoment_type, segment_suv, designation, date_of_joining,
    date_of_birth, region, department, reporting_manager, reporting_plant_location, working_physical_location, band,
    grade, mobile_number, personal_email, probation, status1, tatal_ctc, fixed_ctc, variable_ctc, pan_number, alternate_mobile,
    adhar_number, address, country, state, city, pincode, blood_group, maritial_status, spouse_name, } = req.body;
  let employee_photo;
  req.file == undefined ? "" : (employee_photo = req.file.path);
  try {
    const loginData = await userDetails.findOne({ where: { employee_id: employee_id } });
    if (loginData) {
      const employData = await userDetails.update(
        {
          title,
          employee_code,
          first_name,
          middle_name,
          last_name,
          gender,
          emplyoment_type,
          segment_suv,
          designation,
          date_of_joining,
          date_of_birth,
          region,
          department,
          reporting_manager,
          reporting_plant_location,
          working_physical_location,
          band,
          grade,
          mobile_number,
          personal_email,
          probation,
          status1,
          tatal_ctc,
          fixed_ctc,
          variable_ctc,
          employee_photo,
          pan_number,
          alternate_mobile,
          adhar_number,
          address,
          country,
          state,
          city,
          pincode,
          blood_group,
          maritial_status,
          spouse_name,
        },
        { where: { employee_id: loginData.dataValues.employee_id } }
      );
      const bankData = await empBankDetail.update(req.body, { where: { empbankId: loginData.dataValues.employee_id } });
      const documentData = await empDocumentDetail.update(req.body, { where: { emp_document_Id: loginData.dataValues.employee_id } });

      let familyUpdateData;
      let prevEmpDetailUpdate;
      if (req.body.prev_id) {
        prevEmpDetailUpdate = await prevEmpDetail.update(req.body, {
          where: { employee_id: loginData.dataValues.employee_id, prev_id: parseInt(req.body.prev_id) }
        })
      }
      if (req.body.family_id) {
        familyUpdateData = await empFamilyDetails.update(req.body, {
          where: { employee_id: loginData.dataValues.employee_id, family_id: parseInt(req.body.family_id) }
        });
      }
      const allresponseData = {
        ...employData,
        ...bankData,
        ...documentData,
        ...familyUpdateData,
        ...prevEmpDetailUpdate,
      };
      return res.status(200).send({ code: 200, message: "Update Successfully!", result: allresponseData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// User update Emp ///////////////

exports.userupdateEmp = async (req, res) => {
  try {
    const employee_id = parseInt(req.params.id);
    let { alternate_mobile, adhar_number, blood_group, maritial_status, spouse_name, pan_number,family_details,current_address,permanent_address } = req.body;

    const user_data = await userDetails.findOne({ where: { employee_id: employee_id } });
    if (user_data && user_data.status=="ACTIVE") {
      const employData = await userDetails.update(
        {
          alternate_mobile: alternate_mobile,
          adhar_number: adhar_number,
          blood_group: blood_group,
          maritial_status: maritial_status,
          spouse_name: spouse_name,
          pan_number: pan_number,
        },
        { where: { employee_id: req.params.id } }
      );
      return res.status(200).send({ message: "User Data updated Successfully!", data: employData });
    } if(user_data && user_data.status=="INACTIVE"){
      const employData = await userDetails.update(
        {
          current_address:current_address,
          parmanent_address:permanent_address,
          alternate_mobile: alternate_mobile,
          adhar_number: adhar_number,
          blood_group: blood_group,
          maritial_status: maritial_status,
          spouse_name: spouse_name,
          pan_number: pan_number,
          family_details: family_details
        },
        { where: { employee_id: req.params.id } }
      );
      return res.status(200).send({ message: "User Data updated Successfully!", data: employData });
    }else  {
      return res.status(404).send({ message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// All Verticles ///////////////

exports.allverticles = async (req, res) => {
  try {
    const vertical_nameData = await vertical.findAll()
    if (vertical_nameData) {
      res.status(200).send({ code: 200, message: "get all gradeData list", data: vertical_nameData })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.typecreate = async (req, res) => {
  const { job_type } = req.body;
  try {
    if (!job_type) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }
    const job_typeExits = await jobTypes.findOne({ where: { job_type: job_type } })
    if (job_typeExits) {
      return res.status(403).send({ message: "job_typedata Already Exits!" })
    }

    const job_type_nameData = await jobTypes.create({
      job_type,
    })
    return res.status(200).send({ code: 200, message: "Create Successfully!", data: job_type_nameData })
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.updatejobdetails = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    let datas = await jobsdata.findOne({ where: { id: jobId } })
    if (datas) {
      let updatedata = await jobsdata.update(req.body, { where: { id: jobId } })
      return res.status(200).send({ code: 200, data: updatedata, message: "data is update successfully!" });
    } else {
      return res.status(403).send({ code: 403, message: "Please enter valid Id!" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.allFormEmployeeList = async (req, res) => {
  const allData = await userDetails.findAll({

    include: [
      {
        model: empFamilyDetails,

      },
      {
        model: prevEmpDetail,
        where: {},
      },
      {
        model: empBankDetail,
      },
      // {
      //   model: empDocumentDetail,
      //   where: {},
      // },
    ],
  });
  return res.send(allData);
};

exports.getEmpDetails = async (req, res) => {
  const employId = req.params.employId;
  const status = "ACTIVE";
  try {
    const allData = await userDetails.findAll({
      where: { employee_id: employId },
      include: [
        {
          model: empFamilyDetails,
          where: { employee_id: employId, status: status },
        },
        {
          model: prevEmpDetail,
          where: { employee_id: employId, status: status },
        },
        {
          model: empBankDetail,
          where: { employee_id: employId, status: status },
        },
        {
          model: empDocumentDetail,
          where: { employee_id: employId, status: status },
        },
      ],
    });
    if (allData) {
      return res.send(allData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports.getPersonlaDetails = async (req, res) => {
  const employee_id = req.params.employId;
  const allData = await userDetails.findAll({ where: { employee_id: employee_id } })
}


exports.getFamilyDetails = async (req, res) => {
  const employee_id = req.params.employId;
  const status = "ACTIVE";
  try {
    const getAllData = await empFamilyDetails.findAll({ where: { employee_id: employee_id, status: status } });
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


exports.getPrevEmpDetails = async (req, res) => {
  const employee_id = req.params.employId;
  const status = "ACTIVE";
  try {
    const getAllData = await prevEmpDetail.findAll({ where: { employee_id: employee_id, status: status } });
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


exports.getSalaryDetails = async (req, res) => {
  const employee_id = req.params.employId;
  const status = "ACTIVE";
  try {
    const getAllData = await empBankDetail.findAll({ where: { employee_id: employee_id, status: status } });
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


exports.getDocumentDetails = async (req, res) => {
  const employee_id = req.params.employId;
  const status = "ACTIVE";
  try {
    const getAllData = await empDocumentDetail.findAll({ where: { employee_id: employee_id, status: status } });
    if (!getAllData) {
      res.status(400).send({ message: "User not found ", data: getAllData });
    }
    else if (getAllData) {
      return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
    } else {
      return res.status(404).send({ message: "Record Not Found" });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
}


exports.deletePrevEmpDetails = async (req, res) => {
  const prev_id = req.params.prev_id;
  try {
    const data = await prevEmpDetail.findOne({ where: { prev_id: prev_id } })
    if (data) {
      const data = await prevEmpDetail.update({ status: "INACTIVE" }, {
        where: { prev_id: prev_id }
      })
      return res.status(200).send({ code: 200, message: "data is deleted successfully!", data: data });
    } else {
      return res.status(403).send({ code: 403, message: "Please enter valid Id!" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.deleteDocumentDetails = async (req, res) => {
  const emp_document_id = req.params.emp_document_id;
  try {
    const data = await empDocumentDetail.findOne({ where: { emp_document_id: emp_document_id } })
    if (data) {
      const data = await empDocumentDetail.update({ status: "INACTIVE" }, { where: { emp_document_id: emp_document_id } })
      return res.status(200).send({ code: 200, message: "data is deleted successfully!", data: data });
    } else {
      return res.status(403).send({ code: 403, message: "Please enter valid Id!" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.deleteFamilyDetails = async (req, res) => {
  const family_id = req.params.family_id;
  try {
    const data = await empFamilyDetails.findOne({ where: { family_id: family_id } })
    if (data) {
      const data = await empFamilyDetails.update({ status: "INACTIVE" }, { where: { family_id: family_id } })
      return res.status(200).send({ code: 200, data: data, message: "data is deleted successfully!" });
    } else {
      return res.status(403).send({ code: 403, message: "Please pass valid family id" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}


exports.updateEmpPrevDetail = async (req, res) => {
  let employee_id = parseInt(req.params.employId);
  try {
    for (let i = 0; i < req.body.length; i++) {
      var ObjEmployee = {
        company_name: req.body[i].company_name,
        position: req.body[i].position,
        from_date: req.body[i].from_date,
        to_date: req.body[i].to_date,
        employee_id: req.body[i].employee_id,
        last_drawn_salary: req.body[i].last_drawn_salary,
        location: req.body[i].location,
        reson_of_leaving: req.body[i].reson_of_leaving,
      };
      if (req.body[i].prev_id) {
        familyUpdateData = await prevEmpDetail.update(ObjEmployee, {
          where: { employee_id: employee_id, prev_id: parseInt(req.body[i].prev_id) }
        });
      }
    }
    return res.status(200).send({ code: 200, message: "Update Successfully!", data: familyUpdateData, });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.update_previous_details=async(req,res)=>{
  try{
    const employee_id=req.params.id
    const previous_employee_details=req.body.previous_employee_details
    const employee_data=await userDetails.findOne({where:{employee_id:employee_id}})
    if(employee_data){
      const update_emp_data=await userDetails.update({
        previous_employee_details:previous_employee_details
      },{where:{employee_id:employee_id}})
      return res.status(200).send({code: 200, message:"Employee Previous Details updated"})
    }
    else{
      return res.status(404).send({code: 404, message:"No Employee found"})
    }
  }
  catch(error){
    console.log(error);
    return res.status(500).send({ code: 500, message: "Internal Server Error"})
  }
}


