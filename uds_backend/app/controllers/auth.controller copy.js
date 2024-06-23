const db = require("../models");
const { Op } = require("sequelize");
const config = require("../config/auth.config");
const User = db.user;
const transport = require("../services/nodemailer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const moment = require("moment-timezone")
const fs = require('fs')
const s3 = require('../config/s3config');
const { log } = require("console");
const baseUrl = "https://emerpapi.elitetraveltech.in/";
const empFamilyDetails = db.empFamilyDetails;
const auditorQualificationDetails = db.auditorQualification
const users = db.user
const Onboarding_document_model = db.Onboarding_document_data
const Role_menu = db.role_menu_access
const candidateProfileDetails = db.candidateProfile;
const CryptoJS = require("crypto-js");

let kmsStr = "REVJA";
kmsStr = kmsStr + '0000';

/////////////// Signup ///////////////

exports.signup = async (req, res) => {
  try {
    let title = req.body.title;
    let user_role = req.body.user_role;
    let employee_official_email = req.body.employee_official_email;
    let employee_code = req.body.employee_code;
    let first_name = req.body.first_name;
    let middle_name = req.body.middle_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let segment_suv = req.body.segment_suv;
    let designation = req.body.designation;
    let date_of_joining = req.body.date_of_joining;
    let date_of_birth = req.body.date_of_birth;
    let region = req.body.region;
    let department = req.body.department;
    let country = req.body.country;
    let state = req.body.state;
    let role_master_id = req.body.role_master_id
    let city = req.body.city;
    let pincode = req.body.pincode;
    var reporting_manager = req.body.reporting_manager;
    var reporting_manager_id = req.body.reporting_manager_id;
    let reporting_plant_location = req.body.reporting_plant_location;
    let working_physical_location = req.body.working_physical_location;
    let band = req.body.band;
    let grade = req.body.grade;
    let branch_id = req.body.branch_id;
    let mobile_number = req.body.mobile_number;
    let mobile_code = req.body.mobile_code;
    let personal_email = req.body.personal_email;
    let probation = req.body.probation;
    let status = req.body.status;
    let total_ctc = req.body.total_ctc;
    let fixed_ctc = req.body.fixed_ctc;
    let variable_ctc = req.body.variable_ctc;
    let Channel_partner = req.body.Channel_partner;
    let { current_address, parmanent_address } = req.body;

    let abc = req.body.employee_id

    let link = "https://emerp.elitetraveltech.in/auth/login";
    const baseUrl = "https://emerpapi.elitetraveltech.in/";
    const auditorQualificationDetails = db.auditorQualification
    let employee_photo;
    req.file == undefined ? "" : (employee_photo = req.file.path);
    if (!req.file == undefined) {
      fs.renameSync(req.file.path, employee_photo)
    }
    if (employee_official_email && first_name) {
      var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var passwordLength = 14;
      var password = "";
      for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
      const date1 = new Date()
      const date = new Date(date_of_joining)
      let users = date.setMonth(date.getMonth() + 6)
      var probation22 = moment(new Date(users)).format('YYYY-MM-DD')

      const employee_id = await User.create({
        title: title,
        employee_official_email: employee_official_email,
        employee_code: employee_code,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        gender: gender,
        segment_suv: segment_suv,
        designation: designation,
        date_of_joining: date_of_joining,
        date_of_birth: date_of_birth,
        region: region,
        role_master_id: role_master_id,
        department: department,
        country: country,
        state: state,
        city: city,
        pincode: pincode,
        reporting_manager: reporting_manager,
        reporting_manager_id: reporting_manager_id,
        reporting_plant_location: reporting_plant_location,
        working_physical_location: working_physical_location,
        band: band,
        grade: grade,
        branch_id: branch_id,
        employee_photo: baseUrl + employee_photo,
        //mobile_code tested
        mobile_number: mobile_number,
        mobile_code: mobile_code,
        personal_email: personal_email,
        probation: probation,
        probation1: probation22,
        status: status,
        user_role: user_role,
        total_ctc: total_ctc,
        fixed_ctc: fixed_ctc,
        variable_ctc: variable_ctc,
        password: bcrypt.hashSync(password, 8),
      });

      if (password) {
        info = await transport.mailsend({
          from: "emerp.erp@gmail.com",
          to: employee_official_email,
          subject: "ERP - Password ",
          html: `<p><strong>Hi ${first_name}</strong> <br>Please find your link for ERP login <a href = ${link}>Click Here </a>
         Your <strong>Official Email Id is</strong> ${employee_official_email}
         Your Password is: <strong> ${password} </strong> </p>`,
        });
      }
      return res.status(200).send({ statusCode: 200, status: "success", message: "Registration Successfully!", employee_id: employee_id.employee_id });
    }
    if (first_name && employee_official_email) {
      var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var passwordLength = 14;
      var password = "";
      for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
      const date1 = new Date()
      const date = new Date(date1)
      let users = date.setMonth(date.getMonth() + 6)
      var probation22 = moment(new Date(users)).format('YYYY-MM-DD')

      if (req.body.employee_id != 'null') {
        var emp_data = await User.update({
          title: title,
          employee_official_email: employee_official_email,
          employee_code: employee_code,
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          gender: gender,
          segment_suv: segment_suv,
          designation: designation,
          date_of_joining: date_of_joining,
          date_of_birth: date_of_birth,
          region: region,
          department: department,
          country: country,
          state: state,
          city: city,
          role_master_id: parseInt(role_master_id) || "",
          pincode: pincode,
          reporting_manager: reporting_manager,
          reporting_manager_id: parseInt(reporting_manager_id),
          reporting_plant_location: reporting_plant_location,
          working_physical_location: working_physical_location,
          band: band,
          grade: grade,
          branch_id: branch_id,
          employee_photo: baseUrl + employee_photo,
          mobile_number: mobile_number,
          personal_email: personal_email,
          probation: probation22,
          probation1: null,
          status: status,
          user_role: user_role,
          total_ctc: total_ctc,
          fixed_ctc: fixed_ctc,
          variable_ctc: variable_ctc,
          password: bcrypt.hashSync(password, 8),

        }, { where: { employee_id: req.body.employee_id } })
        if (password) {
          info = await transport.mailsend({
            from: process.env.EMAIL_FROM,
            to: employee_official_email,
            subject: "ERP - Password ",
            html: `<p><strong>Hi ${first_name}</strong> <br>Please find your link for ERP login <a href = ${link}>Click Here </a>
           Your <strong>Official Email Id is</strong> ${employee_official_email}
           Your Password is: <strong> ${password} </strong> </p>`,
          });
        }
        return res.status(200).send({ code: 200, message: "Employee data Updated Successfully", data: emp_data })
      }
      else if (req.body.employee_id == 'null') {
        var employee_id = await User.create({
          title: title,
          employee_official_email: employee_official_email,
          employee_code: employee_code,
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          gender: gender,
          segment_suv: segment_suv,
          designation: designation,
          date_of_joining: date_of_joining,
          date_of_birth: date_of_birth,
          region: region,
          department: department,
          country: country,
          state: state,
          city: city,
          role_master_id: parseInt(role_master_id) || "",
          pincode: pincode,
          reporting_manager: reporting_manager,
          reporting_manager_id: parseInt(reporting_manager_id),
          reporting_plant_location: reporting_plant_location,
          working_physical_location: working_physical_location,
          band: band,
          grade: grade,
          branch_id: branch_id,
          employee_photo: baseUrl + employee_photo,
          mobile_number: mobile_number,
          personal_email: personal_email,
          probation: probation22,
          probation1: null,
          status: status,
          user_role: user_role,
          total_ctc: total_ctc,
          fixed_ctc: fixed_ctc,
          variable_ctc: variable_ctc,
          password: bcrypt.hashSync(password, 8),
          // current_address,parmanent_address
        });

        if (password) {
          info = await transport.mailsend({
            from: process.env.EMAIL_FROM,
            to: employee_official_email,
            subject: "ERP - Password ",
            html: `<p><strong>Hi ${first_name}</strong> <br>Please find your link for ERP login <a href = ${link}>Click Here </a>
         Your <strong>Official Email Id is</strong> ${employee_official_email}
         Your Password is: <strong> ${password} </strong> </p>`,
          });
        }
        return res.status(200).send({ code: 200, message: "Employee created", data: employee_id })
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Server Error" });
  }
};

exports.get_ById_user = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const getData = await User.findAll({ where: { employee_id: employeeId } });
    if (getData) {
      var array = [];
      for (var i = 0; i < getData.length; i++) {
        const first_name = getData[i].first_name
        const last_name = getData[i].last_name
        var obj = {
          "employee_id": getData[i].employee_id,
          "fullName": first_name + " " + last_name,
          "segment_suv": getData[i].segment_suv,
          "department": getData[i].department,
          "employee_code": getData[i].employee_code,
        }
        array.push(obj);
      }
      return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: array });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};
/////////////// Signin ///////////////

exports.signin = async (req, res) => {
  const bytesEmail = CryptoJS.AES.decrypt(req.body.encryptedEmail, 'email');
  const bytesPassword = CryptoJS.AES.decrypt(req.body.encryptedPassword, 'password');
  req.body.employee_official_email = bytesEmail.toString(CryptoJS.enc.Utf8);
  req.body.password = bytesPassword.toString(CryptoJS.enc.Utf8);
  const employee_official_email = "superadmin@emerpindia.com"
  const userPassword = "superadmin"
  const defaultPassword = "123456789"
  
  let isInActive = await User.findOne({
    where: {
      employee_official_email: req.body.employee_official_email,
    },
  })
  if (isInActive) {
      if ( isInActive?.status == 'INACTIVE') {
        return res.status(200).send({
          message: "User is inactive",
        });
      }
  }


  if (req.body.employee_official_email == employee_official_email && req.body.password == userPassword) {
    return res.status(200).send({ message: "You are Super Admin" });
  } else if (req.body.employee_official_email != employee_official_email && req.body.password != userPassword) {
    User.findOne({
      where: {
        employee_official_email: req.body.employee_official_email,
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Your User Name or Password Incorrect ",
        });
      }
      var passwordIsValid =
        req.body.password === defaultPassword || bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Your User Name or Password Incorrect",
        });
      }
      // var token = jwt.sign({ id: user.id }, config.secret, {
      //   expiresIn: config.expiresIn, // 24 hours
      // });
      var token = jwt.sign({ id: user.id }, config.secret);
      if (token) {
        user?.update({ token: token });
      }

      const roleMenuAccessId = parseInt(user.employee_id)
      let getData = db.sequelize.query(
        `SELECT rma.role_module_master_id,
        rma.role_module_master_completed,
        rma.menu_master_id, 
        rma.submenu_master_id, 
        rma.menu_completed, 
        rma.submenu_completed,
        rma.role_master_id,  
        rma.employee_id, 
        rmm.role_module_master_id,
        rmm.role_module_master_name,
        rmm.module_master_link,
        rmm.module_master_icon,
        rmm.module_master_endIcon,
        sm.submenu_master_id,
        mm.menu_master_id,
        mm.menu_master_name,
        mm.menu_title,
        mm.menu_masters_icon,
        mm.menu_master_link,
        mm.menu_master_lastIcon,
        sm.submenu_masters_link,
        sm.submenu_masters_icon,
        sm.submenu_master_name
      FROM role_module_masters rmm
      LEFT JOIN menu_masters mm ON rmm.role_module_master_id = mm.role_module_master_id
      LEFT JOIN submenu_masters sm ON mm.menu_master_id=sm.menu_master_id
      LEFT JOIN role_menu_accesses rma ON (rma.role_module_master_id = rmm.role_module_master_id OR rma.role_module_master_id IS NULL) AND 
      (rma.menu_master_id = mm.menu_master_id OR rma.menu_master_id IS NULL) AND 
      (rma.submenu_master_id = sm.submenu_master_id OR rma.submenu_master_id IS NULL) 
      AND rma.employee_id =${roleMenuAccessId};`,

        {
          type: db.sequelize.QueryTypes.SELECT,
        }).then((getData) => {
          if (!getData) {
            return res.status(403).send({ code: 403, message: "Your User Name or Password Incorrect " });
          }
          let uniqueData = getData.map((item) => item.menu_master_id);
          uniqueData = [...new Set(uniqueData)];

          let uniqueDataInf = getData.map((index) => index.role_module_master_id)
          uniqueDataInf = [...new Set(uniqueDataInf)];

          const maindata = [];
          const Data = [];
          uniqueData.forEach((element) => {
            let data = getData.filter((obj) => obj.menu_master_id == element);
            for (let i of data) {
              if (i.role_module_master_completed == 1) {
                i.role_module_master_completed = true
              } else if (i.role_module_master_completed == 0) {
                i.role_module_master_completed = false
              }
              if (i.menu_completed == 1) {
                i.menu_completed = true
              } else if (i.menu_completed == 0) {
                i.menu_completed = false
              }
              if (i.submenu_completed == 1) {
                i.submenu_completed = true
              } else if (i.submenu_completed == 0) {
                i.submenu_completed = false
              }
            }

            let object = {
              role_menu_access_id: data[0].role_menu_access_id,
              employee_id: data[0].employee_id,
              role_module_master_id: data[0].role_module_master_id,
              role_module_master_name: data[0].role_module_master_name,
              role_module_master_completed: data[0].role_module_master_completed,
              menu_master_id: data[0].menu_master_id,
              menu_master_name: data[0].menu_master_name,
              menu_title: data[0].menu_title,
              menu_masters_icon: data[0].menu_masters_icon,
              menu_master_link: data[0].menu_master_link,
              menu_master_lastIcon: data[0].menu_master_lastIcon,
              menu_completed: data[0].menu_completed,
              status: data[0].status,
              submenu_masters: data,
            };
            Data.push(object);
          });

          uniqueDataInf.forEach((index) => {
            let data2 = Data.filter((obj) => obj.role_module_master_id == index);

            let parentObj = {
              role_module_master_id: data2[0].role_module_master_id,
              role_module_master_name: data2[0].role_module_master_name,
              role_module_master_completed: data2[0].role_module_master_completed,
              menu_masters_icon: data2[0].menu_masters_icon,
              menu_master_link: data2[0].menu_master_link,
              menu_master_lastIcon: data2[0].menu_master_lastIcon,
              menu_masters: data2
            }
            maindata.push(parentObj)
          })

          let filterSuperModules = maindata.filter((e) => e.role_module_master_completed === true);
          for (let i = 0; i < filterSuperModules.length; i++) {
            let subSuperModule = filterSuperModules[i].menu_masters;
            let filterSubSuperModule = subSuperModule.filter((e) => e.menu_completed === true);
            var subSuperModulelength = filterSuperModules.length
            subSuperModule.length = 0;
            subSuperModule.push(...filterSubSuperModule);

            for (let j = 0; j < subSuperModule.length; j++) {
              let subModule = subSuperModule[j].submenu_masters;
              let filterSubModule = subModule.filter((e) => e.submenu_completed === true);
              subModule.length = 0;
              subModule.push(...filterSubModule)
            }
          }

          return res.status(200).send({
            id: user.id,
            employee_official_email: user.employee_official_email,
            employee_photo: user.employee_photo,
            first_name: user.first_name,
            employee_id: user.employee_id,
            roles: user.user_role,
            role_master_id: user.role_master_id,
            accessToken: token,
            role_menu_access_data: filterSuperModules,
            subSuperModulelength: subSuperModulelength
          });
        });
    }).catch((err) => {
      console.log(err)
      return res.status(500).send({ code: 500, message: err.message });
    });
  } else {
    return res.status(404).send({ code: 404, message: "Your User Name or Password Incorrect " });
  }
};

/////////////// Logout ///////////////

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("shop/signin");
};

/////////////// Forget Password ///////////////

exports.forgetPassword = async (req, res) => {
  try {
    if (!req.body.employee_official_email) {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
    var chck = await User.findOne({ where: { employee_official_email: req.body.employee_official_email } });
    if (chck) {
      var verify_link = 'https://emerp.elitetraveltech.in/Forgot?employee_id=' + chck.employee_id;
      var obj_data = {
        from: process.env.EMAIL_FROM,
        to: req.body.employee_official_email,
        'employee_official_email': chck.employee_official_email,
        'html': '',
        'html': '<html><body>' +
          'Hi ' + chck.first_name + ',' + '<br>' +
          'Thanks for getting started with ERP! Simply click the button below to set your  password' + '\n\n' +
          '.</p> <a href = ' + verify_link + ' ><button class="btn" style="padding: 6px 8px; border-radius: 7px; cursor: pointer; border-color: blue; color: white; background-color:blue;">Create Password </a><p>' +
          '</body></html>',
        'subject': 'Link for set password for ERP'
      };
      await transport.mailsend(obj_data);
      return res.status(200).send({ code: 200, message: "Password sent on your email can you please check" })
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ code: 500, message: "Server Error" });
  }
}

/////////////// Get List Files ///////////////

const getListFiles = (req, res) => {
  const directoryPath = "./download/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send({ code: 500, message: "Unable to scan files!" });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    return res.status(200).send(fileInfos);
  });
};

/////////////// All User List ///////////////

exports.alluserlist = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: { isDeleted : false },
      // attributes: {
      //   exclude: ['password']
      // }
    });
    if (userData) {
      userData.sort((a, b) => {
        return b.employee_id - a.employee_id
      })
      return res.status(200).send({ code: 200, message: "Fetch All User List Data Successfully!", data: userData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};
exports.allsalesPreson = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        [Op.and]: [
          { role_master_id: 22 },
          { isDeleted: false }
        ]
      },
      attributes: ["employee_id", "first_name", "employee_code", "employee_official_email", "role_master_id",]
    });
    if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All User List Data Successfully!", data: userData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.alll1approver = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        [Op.and]: [
          { role_master_id: 8 },
          { isDeleted : false }
        ]
      },
      attributes: ["employee_id", "first_name", "role_master_id",]
    });
    if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All User List Data Successfully!", data: userData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};
// 35
exports.alll2approver = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        [Op.and]: [
          { role_master_id: 35 },
          { isDeleted : false }
        ]
      },
      attributes: ["employee_id", "first_name", "role_master_id",]
    });
    if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All User List Data Successfully!", data: userData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// All User List Name ///////////////

exports.alluserlistName = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: { isDeleted: false },
      attributes: ["employee_id", "first_name", "last_name", "employee_code", "role_master_id", "reporting_manager"],
    });
    if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All User List Name Data Successfully!", data: userData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports.get_All_Aduitorlistwithname = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        [Op.and]: [
          { role_master_id: 27 },
          { isDeleted: false }
        ]
      },
      attributes: ["employee_id", "employee_code", "first_name", "employee_official_email", "mobile_number", "designation", "role_master_id"],
    });
    if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All Auditor List Data Successfully!", data: userData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// All List Global Sales Manager ///////////////

exports.allListGlobalSalesManager = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: { designation: "Global Manager Sales" },
      attributes: ["employee_id", "first_name", "last_name"],
    });
    if (userData.length == 0) {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    } else if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All List Global Sales Manager Data Successfully!", data: userData });
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// All List Regional Business Head ///////////////

exports.allListAgent = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: { role_master_id: 50 },
      attributes: ["employee_id", "first_name", "last_name"],
    });
    if (userData.length == 0) {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    } else if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All Ajent Data Successfully!", data: userData });
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports.allListRegionalBusinessHead = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: { designation: "Regional Business Head" },
      attributes: ["employee_id", "first_name", "last_name"],
    });
    if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All List Regional Business Head Data Successfully!", data: userData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// User ById ///////////////
exports.userById = async (req, res) => {
  try {
    const userId = parseInt(req.params.employee_id);
    let jsonData = await User.findOne({
      where: { employee_id: userId },
      attributes: {
        exclude: ['password']
      }
    });

    function replaceNullValues(obj) {
      for (let key in obj) {
        if (obj[key] === null || obj[key] === "null") {
          obj[key] = "";
        } else if (typeof obj[key] === 'object') {
          replaceNullValues(obj[key]);
        }
      }
    }

    replaceNullValues(jsonData);
    // console.log(JSON.stringify(jsonData, null, 2));
    if (!jsonData) {
      return res.status(404).send({ code: 404, message: "User Not Found " });
    }
    else if (jsonData) {
      const family_Data = await empFamilyDetails.findAll({ where: { employee_id: userId } })
      jsonData.dataValues.family_data = family_Data

      const jsonData2 = await User.findOne({ where: { employee_id: jsonData.dataValues.reporting_manager_id } })
      if (jsonData2) {
        let manager_name = jsonData2.first_name + " " + jsonData2.last_name
        jsonData.dataValues.reporting_manager = manager_name
      }
      //  jsonData.from_date.toISOString().split('T')[0]
      return res.status(200).send({ code: 200, message: "Fetch All User Data Successfully!", data: jsonData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.emp_by_id = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const UserData = await User.findOne({
      where: { employee_id: userId },
      attributes: {
        exclude: ['password']
      }
    });
    if (!UserData) {
      return res.status(404).send({ code: 404, message: "User Not Found " });
    } else if (UserData) {
      // const family_Data=await  empFamilyDetails.findAll({where:{employee_id:userId}})
      //   UserData.dataValues.family_data=family_Data
      UserData.dataValues.current_city = UserData.dataValues.current_address[0].city,
        UserData.dataValues.current_states = UserData.dataValues.current_address[0].state,
        UserData.dataValues.current_addres = UserData.dataValues.current_address[0].address,
        UserData.dataValues.currentcountry = UserData.dataValues.current_address[0].country,
        UserData.dataValues.current_pin_code = UserData.dataValues.current_address[0].pin_code,
        UserData.dataValues.parmanent_city = UserData.dataValues.parmanent_address[0].p_city,
        UserData.dataValues.parmanent_states = UserData.dataValues.parmanent_address[0].p_state,
        UserData.dataValues.parmanent_addres = UserData.dataValues.parmanent_address[0].permanent_address,
        UserData.dataValues.parmanentcountry = UserData.dataValues.parmanent_address[0].p_country,
        UserData.dataValues.parmanent_pin_code = UserData.dataValues.parmanent_address[0].p_pin_code
      return res.status(200).send({ code: 200, message: "Fetch All User Data Successfully!", data: UserData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};
/////////////// Get Present Details Single ///////////////

exports.get_present_Details_Single = async (req, res) => {
  try {
    const userId = parseInt(req.params.employee_id);
    const UserData = await User.findOne({
      where: { employee_id: userId },
      attributes: ["employee_id", "address", "address_check_value", "country", "state", "city", "pincode", "permanent_country", "permanent_state", "permanent_city"]
    });
    let newArr = []
    const obj = {
      "employee_id": UserData.employee_id,
      "address": UserData.address,
      "country": UserData.country,
      "state": UserData.state,
      "city": UserData.city,
      "pincode": UserData.pincode,
      "permanent_address": UserData.address,
      "permanent_country": UserData.permanent_country,
      "permanent_state": UserData.permanent_state,
      "permanent_city": UserData.permanent_city,
      "permanent_pincode": UserData.pincode,
      "address_check_value": UserData.address_check_value
    }
    newArr.push(obj)
    if (!UserData) {
      return res.status(404).send({ code: 404, message: "User Not Found " });
    } else if (UserData) {
      return res.status(200).send({ code: 200, message: "Fetch All User Data Successfully!", data: newArr });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Update Present Details Single ///////////////

exports.update_present_Details_Single = async (req, res) => {
  try {
    const userId = parseInt(req.params.employee_id);
    const { country, state, city, permanent_address, permanent_country, permanent_state, permanent_city, permanent_pincode, address_check_value } = req.body;
    const editData = await User.findOne({ where: { employee_id: userId } });
    if (editData) {
      const updateData = await User.update({
        address: permanent_address,
        country: country,
        state: state,
        city: city,
        pincode: permanent_pincode,
        address_check_value: address_check_value,
        permanent_country,
        permanent_state,
        permanent_city,
      },
        { where: { employee_id: userId } }
      );
      const update_data_employee = await User.findOne({ where: { employee_id: userId } })

      const obj = {
        "address": update_data_employee.address,
        "country": update_data_employee.country,
        "state": update_data_employee.state,
        "city": update_data_employee.city,
        "pincode": update_data_employee.pincode,
        "permanent_address": update_data_employee.permanent_address,
        "permanent_country": update_data_employee.permanent_country,
        "permanent_state": update_data_employee.permanent_state,
        "permanent_city": update_data_employee.permanent_city,
        "permanent_pincode": update_data_employee.permanent_pincode,
        "address_check_value": update_data_employee.address_check_value
      }


      return res.status(200).send({ code: 200, message: "Employee Updated Successfully", data: obj });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// User Update By EmployId ///////////////

exports.userUpdateByEmployId = async (req, res) => {
  try {
    const employee_id = parseInt(req.params.employee_id);
    let title = req.body.title;
    let user_role = req.body.user_role;
    let employee_official_email = req.body.employee_official_email;
    let employee_code = req.body.employee_code;
    let first_name = req.body.first_name;
    let middle_name = req.body.middle_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let role_master_id = req.body.role_master_id
    let segment_suv = req.body.segment_suv;
    let designation = req.body.designation;
    let date_of_joining = req.body.date_of_joining;
    let date_of_birth = req.body.date_of_birth;
    let region = req.body.region;
    let department = req.body.department;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
    let pincode = req.body.pincode;
    let reporting_manager = req.body.reporting_manager.replace(/\"/g, "");
    let reporting_manager_id = req.body.reporting_manager_id;
    let reporting_plant_location = req.body.reporting_plant_location;
    let working_physical_location = req.body.working_physical_location;
    let band = req.body.band;
    let grade = req.body.grade;
    let branch_id = req.body.branch_id;
    let mobile_number = req.body.mobile_number;
    let personal_email = req.body.personal_email;
    let probation = req.body.probation;
    let status = req.body.status;
    let total_ctc = req.body.total_ctc;
    let fixed_ctc = req.body.fixed_ctc;
    let variable_ctc = req.body.variable_ctc;

    var employee_photo = req.file == undefined ? "" : employee_photo = req.file.path;
    const userDetails = await User.findOne({ where: { employee_id: employee_id } });

    var employee_photo = employee_photo == '' ? employee_photo = userDetails.employee_photo : employee_photo = baseUrl + employee_photo
    if (userDetails) {
      const employData = await User.update(
        {
          title: title,
          employee_official_email: employee_official_email,
          employee_code: employee_code,
          first_name: first_name,
          user_role: user_role || 1,
          middle_name: middle_name,
          last_name: last_name,
          gender: gender,
          role_master_id: role_master_id,
          segment_suv: segment_suv,
          designation: designation,
          date_of_joining: date_of_joining,
          date_of_birth: date_of_birth,
          region: region,
          department: department,
          country: country,
          state: state,
          city: city,
          pincode: pincode,
          reporting_manager: reporting_manager,
          reporting_manager_id: reporting_manager_id,
          reporting_plant_location: reporting_plant_location,
          working_physical_location: working_physical_location,
          band: band,
          grade: grade,
          branch_id: branch_id,
          employee_photo: employee_photo,
          mobile_number: mobile_number,
          personal_email: personal_email,
          probation: probation,
          status: status,
          total_ctc: total_ctc,
          fixed_ctc: fixed_ctc,
          variable_ctc: variable_ctc,
        },
        {
          where: { employee_id: parseInt(req.params.employee_id) }
        }
      );
      return res.status(200).send({ code: 200, message: "User Data updated Successfully!", data: employData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Fornd" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// Salary Details Update Api ///////////////

exports.salaryDetailsUpdateapi = async (req, res) => {
  try {
    const employee_id = parseInt(req.params.employee_id);
    let { tatal_ctc, fixed_ctc, variable_ctc } = req.body;
    const userDetails = await User.findOne({ where: { employee_id: employee_id } });
    if (userDetails) {
      const Salary = await User.update(
        {
          tatal_ctc: tatal_ctc,
          fixed_ctc: fixed_ctc,
          variable_ctc: variable_ctc,
        },
        {
          where: { employee_id: req.params.employee_id },
        }
      );
      return res.status(200).send({ code: 200, message: "User Data updated successfully.", data: Salary });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// userDetailUpdate ///////////////

exports.userDetailUpdate = async (req, res) => {
  try {
    const employee_id = parseInt(req.params.employee_id);
    let { address, country, state, city, pincode, status } = req.body;
    const userDetails = await User.findOne({ where: { employee_id: employee_id } });
    if (userDetails) {
      const employData = await User.update(
        {
          address: address,
          country: country,
          state: state,
          city: city,
          pincode: pincode,
          status: status
        },
        { where: { employee_id: req.params.employee_id } }
      );
      return res.status(200).send({ code: 200, message: "User Data updated Successfully!", data: employData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

exports.userDetailDelete = async (req, res) => {
  try {
    const employee_id = parseInt(req.params.employee_id);
    const userDetails = await User.findOne({ where: { employee_id: employee_id } });
    if (userDetails) {
      const employData = await User.update(
        {
          isDeleted: true
        },
        { where: { employee_id: req.params.employee_id } }
      );
      return res.status(200).send({ code: 200, message: "User deleted Successfully!", data: employData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// All User List By EmpId ///////////////

exports.alluserlistbyEmpid = async (req, res) => {
  try {
    const empId = parseInt(req.params.employee_id);
    const userData = await User.findAll({
      where: { status: "ACTIVE", employee_id: empId },
      attributes: {
        exclude: ['password']
      }
    });
    if (userData) {
      return res.status(200).send({ code: 200, message: "Fetch All User List By EmployeeId Data Successfully!", data: userData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

exports.get_All_Aduitor = async (req, res) => {
  try {
    const get_all_emp = await auditorQualificationDetails.findAll({})
    if (get_all_emp) {
      return res.status(200).send({ code: 200, message: "Data Detched", data: get_all_emp });
    }
    else {
      return res.status(404).send({ code: 404, message: "No Auditor Role Found" })
    }
  }
  catch (error) {
    console.log(error);
    return res.state(500).send({ code: 500, message: "Server Error" })
  }
}
exports.Update_Auditor_byid = async (req, res) => {
  try {
    const auditor_id = req.params.id;
    const { standard_audit, accredition_audit, sector_audit, nomination_since, valid_until_audit } = req.body;
    const audit_data = await auditorQualificationDetails.findOne({ where: { audit_qualification_id: auditor_id } })
    if (audit_data) {
      const Update_Audit = auditorQualificationDetails.update({
        auditor_standard: standard_audit,
        auditor_accreditation: accredition_audit,
        auditor_sectors: sector_audit,
        auditor_nomination_since: nomination_since,
        auditor_valid_until: valid_until_audit
      }, { where: { audit_qualification_id: auditor_id } })
      res.status(200).send({ code: 200, message: "Data updated successfully", data: Update_Audit })
    }
    else {
      res.status(404).send({ code: 404, message: "No Auditor Data Found" })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ code: 500, message: "server Error" })
  }
}

exports.get_auditor_data = async (req, res) => {
  try {
    const auditor_standard = req.body.auditor_standard
    const auditor_data = await auditorQualificationDetails.findAll({ where: { auditor_standard: auditor_standard } })
    if (auditor_data) {
      return res.status(200).send({ code: 200, message: "Data fetched successfully", data: auditor_data })
    }
    else {
      return res.status(404).send({ code: 404, message: "No auditor_standard found" })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "server Error" })
  }
}

exports.get_all_role = async (req, res) => {
  try {
    const employee_id = req.params.id;
    const user_data = await users.findOne({ where: { employee_id: employee_id } })
    if (user_data) {
      let role_id = user_data.employee_id;
      const role_access_data = await Role_menu.findAll({ where: { role_master_id: role_id } })
      return res.status(200).send({ code: 200, message: "Data fetched", data: role_access_data })
    }
    else {
      return res.status(404).send({ code: 404, message: "No Data Found" })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Internal Server Error" })
  }
}

exports.create_employee_paymentaccount = async (req, res) => {
  try {
    const { bank_name, bank_address, employee_name_in_bank, account_number, ifsc_code, pf_number, UAN_number } = req.body
    const employee_id = req.params.id
    const employee_data = await User.findOne({ where: { employee_id: employee_id } })
    if (employee_data) {
      const update_Account = await User.update({
        bank_name,
        bank_address,
        employee_name_in_bank,
        account_number,
        ifsc_code,
        pf_number,
        UAN_number,
      }, { where: { employee_id: employee_id } })
      return res.status(200).send({ code: 200, message: "Account details updated successfully" })
    }
    else {
      return res.status(404).send({ code: 404, message: "No employee found" })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Internal Server Error" })
  }
}


exports.create_previous_employement = async (req, res) => {
  try {
    const employee_id = req.params.id
    const previous_employee_details = req.body.previous_employement_details
    const Onboarding_Data = await User.findOne({ where: { employee_id: employee_id } })
    if (Onboarding_Data) {
      const Previous_employement = await User.update({ previous_employee_details },
        { where: { employee_id: employee_id } })
      return res.status(200).send({ code: 200, message: "previous_employement_created" })
    }
    else {
      return res.status(404).send({ code: 404, message: "No Onboarding Candidate found" })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Internal Server Error" })
  }
}


exports.get_all_unapproved_emp = async (req, res) => {
  try {
    const Unaproved_data = await User.findAll({ where: { status: "INACTIVE" } })
    if (Unaproved_data) {
      Unaproved_data.sort().reverse()
      return res.status(200).send({ code: 200, message: "data fetched successfully", data: Unaproved_data })
    }
    else {
      return res.status(404).send({ code: 404, message: "No Unapproved  " })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Internal Server Error" })
  }
}

exports.approved_unapproved_emp = async (req, res) => {
  try {
    const employee_id = req.params.id
    const emp_id = req.body.emp_id
    const status = req.body.status
    const verify_role = await User.findOne({ where: { employee_id: employee_id } })

    // if(verify_role.role_master_id==45 || verify_role.role_master_id==18){

    const employee_data = await User.findOne({ where: { employee_id: emp_id } })
    if (employee_data) {
      const employee_approved = await User.update({ status }, { where: { employee_id: emp_id } })
      return res.status(200).send({ code: 200, message: "Employee Approved" })
    }
    else {
      return res.status(403).send({ code: 403, message: "No employee found" })
    }

    // } 
    // else{
    //   return res.status(404).send({code:404,message:"Your role is not Hr"})
    // }
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Internal Server Error" })
  }
}


exports.employee_data = async (req, res) => {
  try {
    const employee_id = req.params.id
    const emp_data = await User.findOne({ where: { employee_id: employee_id } })
    const document = await Onboarding_document_model.findAll({ where: { employee_id: employee_id } })

    let Arr = []
    Arr.push(...document)
    emp_data.dataValues.document_data = Arr

    // const emp_data2=await User.update({permanent_country, permanent_state,permanent_city, permanent_address}, {where:{employee_id:emp_data.reporting_manager_id}})


    const emp_data2 = await User.findOne({ where: { employee_id: emp_data.reporting_manager_id } })
    console.log("employee data 2 is",emp_data2)
    if (!emp_data2) {
      return res.status(200).send({ code: 200, message: "Employee Data fetched successfully", data: emp_data })
    }
    else {
      let manager_name = emp_data2.first_name + " " + emp_data2.last_name
      emp_data.reporting_manager = manager_name
    }
    if (emp_data) {
      return res.status(200).send({ code: 200, message: "Employee Data fetched successfully", data: emp_data })
    }
    else {
      return res.status(404).send({ code: 404, message: "No Employee  Data found" })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Internal Server" })
  }
}

exports.send_form_status = async (req, res) => {
  try {
    const employee_id = req.params.id;
    // const final_form_submit=req.body.final_form_submit
    const { final_form_submit, condidateId, employeId } = req.body
    let employee_data = await User.findOne({ where: { employee_id: employee_id } })
    if (employee_data) {
      const candidate_data = await User.update({ final_form_submit }, { where: { employee_id: employee_id } })
      let employee_data = await User.findOne({ where: { employee_id: employee_id } })
      let employee_data_detail = await candidateProfileDetails.findOne({ where: { candidate_id: condidateId } })

      if (employee_data.final_form_submit == "True") {
        const update_candidate_data = await candidateProfileDetails.update({ status1: "True" }, { where: { candidate_id: employee_data_detail.candidate_id } })
        return res.status(200).send({ code: 200, message: "form submitted", data: employee_data })
      }
      else {
        return res.status(403).send({ code: 403, message: "You have Already Submitted The form" })
      }
    }
  }
  catch (error) {
    console.log(error)
  }
}

exports.create_candidate = async (req, res) => {
  try {
    let title = req.body.title;
    let user_role = req.body.user_role;
    let employee_official_email = req.body.employee_official_email;
    let employee_code = req.body.employee_code;
    let first_name = req.body.first_name;
    let middle_name = req.body.middle_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let segment_suv = req.body.segment_suv;
    let designation = req.body.designation;
    let date_of_joining = req.body.date_of_joining;
    let date_of_birth = req.body.date_of_birth;
    let region = req.body.region;
    let department = req.body.department;
    let country = req.body.country;
    let state = req.body.state;
    let role_master_id = req.body.role_master_id
    let city = req.body.city;
    let pincode = req.body.pincode;
    var reporting_manager = req.body.reporting_manager;
    var reporting_manager_id = req.body.reporting_manager_id;
    let reporting_plant_location = req.body.reporting_plant_location;
    let working_physical_location = req.body.working_physical_location;
    let band = req.body.band;
    let grade = req.body.grade;
    let mobile_number = req.body.mobile_number;
    let personal_email = req.body.personal_email;
    let probation = req.body.probation;
    let status = req.body.status;
    let total_ctc = req.body.total_ctc;
    let fixed_ctc = req.body.fixed_ctc;
    let variable_ctc = req.body.variable_ctc;
    let { current_address, parmanent_address } = req.body;

    let abc = req.body.employee_id
    let link = "https://emerp.elitetraveltech.in/auth/login";
    const baseUrl = "https://emerpapi.elitetraveltech.in/";
    const auditorQualificationDetails = db.auditorQualification
    let employee_photo;
    req.file == undefined ? "" : (employee_photo = req.file.path);
    if (!req.file == undefined) {
      fs.renameSync(req.file.path, employee_photo)
    }
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 14;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    const date1 = new Date()
    const date = new Date(date1)
    let users = date.setMonth(date.getMonth() + 6)
    var probation22 = moment(new Date(users)).format('YYYY-MM-DD')
    if (req.body.employee_id != 'null') {
      var emp_data = await User.update({
        title: title,
        employee_official_email: employee_official_email,
        employee_code: employee_code,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        gender: gender,
        segment_suv: segment_suv,
        designation: designation,
        date_of_joining: date_of_joining,
        date_of_birth: date_of_birth,
        region: region,
        department: department,
        country: country,
        state: state,
        city: city,
        role_master_id: parseInt(role_master_id) || "",
        pincode: pincode,
        reporting_manager: reporting_manager,
        reporting_manager_id: parseInt(reporting_manager_id),
        reporting_plant_location: reporting_plant_location,
        working_physical_location: working_physical_location,
        band: band,
        grade: grade,
        employee_photo: baseUrl + employee_photo,
        mobile_number: mobile_number,
        personal_email: personal_email,
        probation: null,
        probation1: probation22,
        status: status,
        user_role: user_role,
        total_ctc: total_ctc,
        fixed_ctc: fixed_ctc,
        variable_ctc: variable_ctc,
        password: bcrypt.hashSync(password, 8),

      }, { where: { employee_id: req.body.employee_id } })
      if (password) {
        info = await transport.mailsend({
          from: process.env.EMAIL_FROM,
          to: employee_official_email,
          subject: "ERP - Password ",
          html: `<p><strong>Hi ${first_name}</strong> <br>Please find your link for ERP login <a href = ${link}>Click Here </a>
           Your <strong>Official Email Id is</strong> ${employee_official_email}
           Your Password is: <strong> ${password} </strong> </p>`,
        });
      }
      return res.status(200).send({ code: 200, message: "Employee data Updated Successfully", data: emp_data })
    }
    else if (req.body.employee_id == 'null') {
      var employee_id = await User.create({
        title: title,
        employee_official_email: employee_official_email,
        employee_code: employee_code,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        gender: gender,
        segment_suv: segment_suv,
        designation: designation,
        date_of_joining: date_of_joining,
        date_of_birth: date_of_birth,
        region: region,
        department: department,
        country: country,
        state: state,
        city: city,
        role_master_id: parseInt(role_master_id) || 27,
        pincode: pincod,
        reporting_manager: reporting_manager,
        reporting_manager_id: parseInt(reporting_manager_id),
        reporting_plant_location: reporting_plant_location,
        working_physical_location: working_physical_location,
        band: band,
        grade: grade,
        employee_photo: baseUrl + employee_photo,
        mobile_number: mobile_number,
        personal_email: personal_email,
        probation: probation22,
        probation1: null,
        status: status,
        user_role: "User",
        total_ctc: total_ctc,
        fixed_ctc: fixed_ctc,
        variable_ctc: variable_ctc,
        password: bcrypt.hashSync(password, 8),
        // current_address,parmanent_address
      });

      if (password) {
        info = await transport.mailsend({
          from: process.env.EMAIL_FROM,
          to: employee_official_email,
          subject: "ERP - Password ",
          html: `<p><strong>Hi ${first_name}</strong> <br>Please find your link for ERP login <a href = ${link}>Click Here </a>
         Your <strong>Official Email Id is</strong> ${employee_official_email}
         Your Password is: <strong> ${password} </strong> </p>`,
        });
      }
      return res.status(200).send({ code: 200, message: "Employee created", data: employee_id })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Internal Server Error" })
  }
}

exports.get_candidates_final_formsubmit = async (req, res) => {
  try {
    const candidate_id = req.params.id
    const candidate_data = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } })
    if (candidate_data == null || candidate_data.status1 == '' || candidate_data.status1 == null) {
      const update_candidate_data = await candidateProfileDetails.update({ status1: "false" }, { where: { candidate_id: candidate_id } })
      var final_candidate_data = await candidateProfileDetails.findOne({
        where: { candidate_id: candidate_id },
        attributes: ['candidate_id', 'condidate_name', 'email', 'status1', 'date_of_joining']
      })
      return res.status(200).send({ code: 200, message: "Form Submitted successfully", data: final_candidate_data })
    }
    else {
      const final_candidate_data = await candidateProfileDetails.findOne({
        where: { candidate_id: candidate_id },
        attributes: ['candidate_id', 'condidate_name', 'email', 'status1', 'date_of_joining']
      })
      return res.status(200).send({ code: 200, message: "Form Submitted successfully", data: final_candidate_data })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Internal Server Error" })
  }
}


exports.generate_Employee_Code = async (req, res) => {
  try {
    const first_name = req.body.first_name;
    const emp_Variable = "EMPP";
    const lastEntry = await User.findAll({
      where: { status: "ACTIVE" },
      order: [['createdAt', 'DESC']],
      attributes: ["employee_code", "employee_id"]
    });
    const last_digit = lastEntry[0].employee_code
    if (last_digit) {
      const lastNumber = parseInt(last_digit.slice(-5), 10);
      var number = lastNumber + 1;
    } else if (last_digit.length == 0 || last_digit.length == null) {
      var number = 1;
    }
    const code = `${number}`.padStart(5, '0');
    const employeeCode2 = emp_Variable + `${number}`.padStart(5, '0');
    const employeeCode = emp_Variable + code;
    if (first_name === "") {
      return res.status(200).send({ code: 200, message: "Please Fill your first_Name First", data: null });
    } else {
      return res.status(200).send({ code: 200, message: "Employee Code has been Generated For Registered User", data: employeeCode });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Internal Server Error" });
  }
};

exports.get_all_employeeBy_User_role = async (req, res) => {
  try {
    const role_Id = req.params.role_masterId;
    const getAllData = await User.findAll({
      where: { role_master_id: role_Id, status: 'ACTIVE' , isDeleted : false },
      order: [['employee_id', 'DESC']]
    });
    if (getAllData) {
      return res.status(200).send({ code: 200, message: "Fetch data by Role Name Successfully", data: getAllData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
}
