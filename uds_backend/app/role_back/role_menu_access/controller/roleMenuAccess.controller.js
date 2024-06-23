const { write } = require("xlsx");
const { gradeDetails } = require("../../../controllers/grade.controller");
const db = require("../../../models/index");
const roleMenuAccessDetails = db.role_menu_access;
const menuMasterDetails = db.menu_master;
const submenuMasterDetails = db.submenu_master;
const read_write_accessrDetails = db.read_write_access;
const { Op, where } = require("sequelize");
const role_module_masterDetails = db.role_module_master;

// exports.createroleMenuAccess = async (req, res) => {
//   try {
//     let results = [];

//     for (let i = 0; i < req.body.length; i++) {
//       var Objrole = {
//         role_master_id: req.body[i].role_master_id,
//         menu_master_id: req.body[i].menu_master_id,
//         menu_completed: req.body[i].menu_completed,
//         submenu_master_id: req.body[i].submenu_master_id,
//         submenu_completed: req.body[i].submenu_completed,
//       };

//       const exitsdata = await roleMenuAccessDetails.findOne({
//         where: { menu_master_id: req.body[i].menu_master_id },
//       });

//       if (exitsdata) {
//         return res.send("menu master Allready exits");
//       }
//       var roledatas = await roleMenuAccessDetails.create(Objrole);
//       results.push(roledatas);
//     }
//     return res
//       .status(200)
//       .send({ code: 200, message: "Role Created Successfully", data: results });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ code: 500, message: "NOT Found ID (Menu OR Sub-Menu)" });
//   }
// };

exports.getAllroleMenuAccess = async (req, res) => {
  const status = "ACTIVE";
  try {
    const getData = await roleMenuAccessDetails.findAll({
      where: { status: status },
      attributes: [
        "role_menu_access_id",
        "employee_id",
        "menu_master_id",
        "menu_completed",
      ],
      include: [
        {
          model: menuMasterDetails,
          attributes: ["menu_master_name"],
          include: [
            {
              model: submenuMasterDetails,
            },
          ],
        },
      ],
    });
    let modifiedArr = [];
    for (let i = 0; i < getData.length; i++) {
      modifiedArr.push({
        role_menu_access_id: getData[i].role_menu_access_id,
        employee_id: getData[i].employee_id,
        menu_master_id: getData[i].menu_master_id,
        menu_completed: getData[i].menu_completed,
        menu_master_name: getData[i].menu_master.menu_master_name,
        submenu_masters: getData[i].menu_master.submenu_masters,
      });
    }

    if (getData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        data: getData,
      });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

// /////////////// GetById roleMenuAccess ///////////////
// for future use this code

exports.getByIdroleMenuAccess = async (req, res) => {
  try {
    const roleMenuAccessId = parseInt(req.params.employee_id);

    // const submenu_masterID = await roleMenuAccessDetails.findAll({
    //   where: { employee_id: roleMenuAccessId },
    //   attributes: ['submenu_master_id', 'role_module_master_id']
    // });

    let getData = await db.sequelize.query(
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
        // replacements: {id: req.user.id},
        type: db.sequelize.QueryTypes.SELECT,
      }
    );


    let uniqueData = getData.map((item) => item.menu_master_id);
    uniqueData = [...new Set(uniqueData)];

    let uniqueDataInf = getData.map((index) => index.role_module_master_id)
    uniqueDataInf = [...new Set(uniqueDataInf)];

    let maindata = [];
    const Data = [];
    uniqueData.forEach((element) => {
      let data = getData.filter((obj) => obj.menu_master_id == element);

      for (let i of data) {
        if (i?.role_module_master_completed == 1) {
          i.role_module_master_completed = true
        }
        else if (i?.role_module_master_completed == 0) {
          i.role_module_master_completed = false
        }
        if (i?.menu_completed == 1) {
          i.menu_completed = true
        }
        else if (i?.menu_completed == 0) {
          i.menu_completed = false
        }
        if (i?.submenu_completed == 1) {
          i.submenu_completed = true
        }
        else if (i?.submenu_completed == 0) {
          i.submenu_completed = false
        }
      }

      let object = {
        role_menu_access_id: data[0]?.role_menu_access_id,
        employee_id: data[0]?.employee_id,
        role_module_master_id: data[0]?.role_module_master_id,
        role_module_master_name: data[0]?.role_module_master_name,
        module_master_link: data[0]?.module_master_link,
        module_master_icon: data[0]?.module_master_icon,
        module_master_endIcon: data[0]?.module_master_endIcon,
        role_module_master_completed: data[0]?.role_module_master_completed,
        menu_master_id: data[0]?.menu_master_id,
        menu_master_name: data[0]?.menu_master_name,
        menu_title: data[0]?.menu_title,
        menu_masters_icon: data[0]?.menu_masters_icon,
        menu_master_link: data[0]?.menu_master_link,
        menu_master_lastIcon: data[0]?.menu_master_lastIcon,
        menu_completed: data[0]?.menu_completed,
        status: data[0]?.status,
        submenu_masters: data,
      };
      Data.push(object);
    });

    uniqueDataInf?.forEach((index) => {
      let data2 = Data.filter((obj) => obj?.role_module_master_id == index);

      let parentObj = {
        role_module_master_id: data2[0]?.role_module_master_id,
        role_module_master_name: data2[0]?.role_module_master_name,
        module_master_link: data2[0]?.module_master_link,
        module_master_icon: data2[0]?.module_master_icon,
        module_master_endIcon: data2[0]?.module_master_endIcon,
        role_module_master_completed: data2[0]?.role_module_master_completed,
        menu_masters_icon: data2[0]?.menu_masters_icon,
        menu_master_link: data2[0]?.menu_master_link,
        menu_master_lastIcon: data2[0]?.menu_master_lastIcon,
        menu_masters: data2
      }
      maindata.push(parentObj)
    })
    maindata?.map((item) => {
      item?.menu_masters?.map((menuItem) => {
        menuItem?.submenu_masters?.map((subMenuItem) => {
          if (!subMenuItem?.submenu_master_name) delete menuItem?.submenu_masters;
        })
      })
    })

    // let filterSuperModules = maindata.filter((e)=>e.role_module_master_completed === true);
    // for(let i=0; i<filterSuperModules.length; i++){
    //   let subSuperModule = filterSuperModules[i].menu_masters;
    //   let filterSubSuperModule = subSuperModule.filter((e)=>e.menu_completed === true);

    //   subSuperModule.length = 0;
    //   subSuperModule.push(...filterSubSuperModule);

    //   for(let j=0; j<subSuperModule.length; j++){
    //     let subModule = subSuperModule[j].submenu_masters;
    //     let filterSubModule = subModule.filter((e)=> e.submenu_completed === true);
    //     subModule.length = 0;
    //     subModule.push(...filterSubModule)
    //   }
    // }

    if (getData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch data by ID Successfully",
        data: maindata,
      });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.getroleMenuAccess = async (req, res) => {
  try {
    const roleMenuAccessId = parseInt(req.params.employee_id);
    let getData = await db.sequelize.query(
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
      FROM role_menu_accesses rma
      LEFT JOIN role_module_masters rmm ON rma.role_module_master_id = rmm.role_module_master_id
      LEFT JOIN menu_masters mm ON rma.menu_master_id = mm.menu_master_id
      LEFT JOIN submenu_masters sm ON rma.submenu_master_id=sm.submenu_master_id
      WHERE rma.employee_id =${roleMenuAccessId};`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    let uniqueData = getData.map((item) => item.menu_master_id);
    uniqueData = [...new Set(uniqueData)];

    let uniqueDataInf = getData.map((index) => index.role_module_master_id)
    uniqueDataInf = [...new Set(uniqueDataInf)];

    let maindata = [];
    const Data = [];
    uniqueData?.forEach((element) => {
      let data = getData.filter((obj) => obj?.menu_master_id == element);

      for (let i of data) {
        if (i?.role_module_master_completed == 1) {
          i.role_module_master_completed = true
        }
        else if (i?.role_module_master_completed == 0) {
          i.role_module_master_completed = false
        }
        if (i?.menu_completed == 1) {
          i.menu_completed = true
        }
        else if (i?.menu_completed == 0) {
          i.menu_completed = false
        }
        if (i?.submenu_completed == 1) {
          i.submenu_completed = true
        }
        else if (i?.submenu_completed == 0) {
          i.submenu_completed = false
        }
      }

      let object = {
        role_menu_access_id: data[0]?.role_menu_access_id,
        employee_id: data[0]?.employee_id,
        role_module_master_id: data[0]?.role_module_master_id,
        role_module_master_name: data[0]?.role_module_master_name,
        module_master_link: data[0]?.module_master_link,
        module_master_icon: data[0]?.module_master_icon,
        module_master_endIcon: data[0]?.module_master_endIcon,
        role_module_master_completed: data[0]?.role_module_master_completed,
        menu_master_id: data[0]?.menu_master_id,
        menu_master_name: data[0]?.menu_master_name,
        menu_title: data[0]?.menu_title,
        menu_masters_icon: data[0]?.menu_masters_icon,
        menu_master_link: data[0]?.menu_master_link,
        menu_master_lastIcon: data[0]?.menu_master_lastIcon,
        menu_completed: data[0]?.menu_completed,
        status: data[0]?.status,
        submenu_masters: data,
      };
      Data.push(object);
    });

    uniqueDataInf?.forEach((index) => {
      let data2 = Data.filter((obj) => obj.role_module_master_id == index);

      let parentObj = {
        role_module_master_id: data2[0]?.role_module_master_id,
        role_module_master_name: data2[0]?.role_module_master_name,
        module_master_link: data2[0]?.module_master_link,
        module_master_icon: data2[0]?.module_master_icon,
        module_master_endIcon: data2[0]?.module_master_endIcon,
        role_module_master_completed: data2[0]?.role_module_master_completed,
        menu_masters_icon: data2[0]?.menu_masters_icon,
        menu_master_link: data2[0]?.menu_master_link,
        menu_master_lastIcon: data2[0]?.menu_master_lastIcon,
        menu_masters: data2
      }
      maindata.push(parentObj)
    })
    let filterSuperModules = maindata?.filter((e) => e?.role_module_master_completed === true);
    for (let i = 0; i < filterSuperModules?.length; i++) {
      let subSuperModule = filterSuperModules[i]?.menu_masters;
      let filterSubSuperModule = subSuperModule.filter((e) => e?.menu_completed === true);
      subSuperModule.length = 0;
      subSuperModule.push(...filterSubSuperModule);

      for (let j = 0; j < subSuperModule?.length; j++) {
        let subModule = subSuperModule[j]?.submenu_masters;
        let filterSubModule = subModule.filter((e) => e.submenu_completed === true);
        subModule.length = 0;
        subModule.push(...filterSubModule)
      }
    }
    filterSuperModules?.map((item) => {
      item?.menu_masters?.map((menuItem) => {
        menuItem?.submenu_masters?.map((subMenuItem) => {
          if (!subMenuItem?.submenu_master_name) delete menuItem?.submenu_masters;
        })
      })
    })


    if (getData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch data by ID Successfully",
        data: filterSuperModules,
      });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

//search filter module
exports.searchMasterFilter = async (req, res) => {
  try {
    // const roleMenuAccessId = parseInt(req.params.role_master_id);
    const { module_master_id, roleMenuAccessId } = req.body
    let getData = await db.sequelize.query(
      `SELECT 
      rma.role_module_master_id,
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
      from submenu_masters sm
      RIGHT JOIN menu_masters mm ON sm.menu_master_id = mm.menu_master_id
      RIGHT JOIN role_module_masters rmm ON mm.role_module_master_id = rmm.role_module_master_id
      LEFT JOIN role_menu_accesses rma ON sm.submenu_master_id = rma.submenu_master_id
      and rma.employee_id =${roleMenuAccessId};`,
      {
        // replacements: {id: req.user.id},
        type: db.sequelize.QueryTypes.SELECT,
      }
    );


    let uniqueData = getData.map((item) => item.menu_master_id);
    uniqueData = [...new Set(uniqueData)];

    let uniqueDataInf = getData.map((index) => index.role_module_master_id)
    uniqueDataInf = [...new Set(uniqueDataInf)];

    let maindata = [];
    const Data = [];
    uniqueData.forEach((element) => {
      let data = getData.filter((obj) => obj.menu_master_id == element);

      for (let i of data) {
        if (i.role_module_master_completed == 1) {
          i.role_module_master_completed = true
        }
        else if (i.role_module_master_completed == 0) {
          i.role_module_master_completed = false
        }
        if (i.menu_completed == 1) {
          i.menu_completed = true
        }
        else if (i.menu_completed == 0) {
          i.menu_completed = false
        }
        if (i.submenu_completed == 1) {
          i.submenu_completed = true
        }
        else if (i.submenu_completed == 0) {
          i.submenu_completed = false
        }
      }

      let object = {
        role_menu_access_id: data[0].role_menu_access_id,
        employee_id: data[0].employee_id,
        role_module_master_id: data[0].role_module_master_id,
        role_module_master_name: data[0].role_module_master_name,
        module_master_link: data[0].module_master_link,
        module_master_icon: data[0].module_master_icon,
        module_master_endIcon: data[0].module_master_endIcon,
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
        module_master_link: data2[0].module_master_link,
        module_master_icon: data2[0].module_master_icon,
        module_master_endIcon: data2[0].module_master_endIcon,
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

      subSuperModule.length = 0;
      subSuperModule.push(...filterSubSuperModule);

      for (let j = 0; j < subSuperModule.length; j++) {
        let subModule = subSuperModule[j].submenu_masters;
        let filterSubModule = subModule.filter((e) => e.submenu_completed === true);
        subModule.length = 0;
        subModule.push(...filterSubModule)
      }
    }

    const filterdata = filterSuperModules.filter((item) => item.role_module_master_id == module_master_id)

    if (getData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch data by ID Successfully",
        data: filterdata,
      });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

// /////////////// UPDATE roleMenuAccess ///////////////

exports.editroleMenuAccess = async (req, res) => {
  let roleMenuAccessId = parseInt(req.params.employee_id);
  try {
    let results = [];
    let role_menuUpdateData;
    let newArray = [];

    let rolemenuaccessdata = await roleMenuAccessDetails.findAll({ where: { status: "ACTIVE" } });
    for (let m = 0; m < req?.body?.length; m++) {
      for (var sub = 0; sub < req?.body[m]?.menu_masters?.length; sub++) {
        if (req?.body[m]?.menu_masters[sub]?.submenu_masters?.length) {
          for (var subchild = 0; subchild < req?.body[m]?.menu_masters[sub]?.submenu_masters?.length; subchild++) {
            let Objrole2 = {
              role_module_master_id: req.body[m].role_module_master_id,
              role_module_master_name: req.body[m].role_module_master_name,
              role_module_master_completed: req.body[m].role_module_master_completed,
              menu_master_id: req.body[m].menu_masters[sub].menu_master_id,
              menu_master_name: req.body[m].menu_masters[sub].menu_master_name,
              submenu_master_id: req.body[m].menu_masters[sub].submenu_masters[subchild].submenu_master_id,
              submenu_master_name: req.body[m].menu_masters[sub].submenu_masters[subchild].submenu_master_name,
              employee_id: roleMenuAccessId,
              menu_completed: req.body[m].menu_masters[sub].menu_completed,
              submenu_completed: req.body[m].menu_masters[sub].submenu_masters[subchild].submenu_completed
            }

            let Objrole = {
              role_module_master_completed: req.body[m].role_module_master_completed,
              menu_completed: req.body[m].menu_masters[sub].menu_completed,
              submenu_completed: req.body[m].menu_masters[sub].submenu_masters[subchild].submenu_completed
            };
            let filterdata = rolemenuaccessdata.filter(item => item.role_module_master_id == Objrole2.role_module_master_id && item.menu_master_id == Objrole2.menu_master_id && item.submenu_master_id == Objrole2.submenu_master_id && item.employee_id == Objrole2.employee_id);

            if (filterdata?.length > 0) {
              role_menuUpdateData = await roleMenuAccessDetails.update(Objrole, {
                where: {
                  menu_master_id: Objrole2.menu_master_id,
                  submenu_master_id: Objrole2.submenu_master_id,
                  employee_id: Objrole2.employee_id,
                  role_module_master_id: Objrole2.role_module_master_id
                }
              });
              const Data = results.push(role_menuUpdateData);
            } else {
              var roledatas = await roleMenuAccessDetails.create(Objrole2);
            }
          }
        }
        else {
          let Objrole2 = {
            role_module_master_id: req?.body[m]?.role_module_master_id,
            role_module_master_name: req?.body[m]?.role_module_master_name,
            role_module_master_completed: req?.body[m]?.role_module_master_completed,
            menu_master_id: req?.body[m]?.menu_masters[sub]?.menu_master_id,
            menu_master_name: req?.body[m]?.menu_masters[sub]?.menu_master_name,
            // submenu_master_id: req?.body[m]?.menu_masters[sub]?.submenu_masters[subchild]?.submenu_master_id,
            // submenu_master_name: req?.body[m]?.menu_masters[sub]?.submenu_masters[subchild]?.submenu_master_name,
            employee_id: roleMenuAccessId,
            menu_completed: req?.body[m]?.menu_masters[sub]?.menu_completed,
            // submenu_completed: req?.body[m]?.menu_masters[sub]?.submenu_masters[subchild]?.submenu_completed
          }

          let Objrole = {
            role_module_master_completed: req?.body[m]?.role_module_master_completed,
            menu_completed: req?.body[m]?.menu_masters[sub]?.menu_completed,
            submenu_completed: false
          };
          let filterdata = rolemenuaccessdata.filter(item => item?.role_module_master_id == Objrole2?.role_module_master_id && item?.menu_master_id == Objrole2?.menu_master_id && item?.submenu_master_id == Objrole2?.submenu_master_id && item?.employee_id == Objrole2?.employee_id);

          if (filterdata?.length > 0) {
            role_menuUpdateData = await roleMenuAccessDetails.update(Objrole, {
              where: {
                menu_master_id: Objrole2?.menu_master_id,
                // submenu_master_id: Objrole2?.submenu_master_id,
                employee_id: Objrole2?.employee_id,
                role_module_master_id: Objrole2?.role_module_master_id
              }
            });
            const Data = results.push(role_menuUpdateData);
          } else {
            var roledatas = await roleMenuAccessDetails.create(Objrole2);
          }
        }
      }
    }
    return res.status(200).send({
      code: 200,
      message: "Role Updated Successfully",
      result: role_menuUpdateData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: error.message || "Server Error" });
  }
};

exports.crudFactionality = async (req, res) => {
  try {

    let { role_module_master_id, menu_master_id, submenu_master_id, forAll, forSingle, Write, Read, Delete } = req.body
    var employee_id = parseInt(req.params.employee_id)

    if (req.body.role_module_master_id && !req.body.menu_master_id && !req.body.submenu_master_id) {
      const menuData = await menuMasterDetails.findAll({ where: { role_module_master_id: req.body.role_module_master_id } })

      for (let i of menuData) {
        let accessdata = await read_write_accessrDetails.findOne({
          where: {
            role_module_master_id: i.role_module_master_id,
            menu_master_id: i.menu_master_id,
            employee_id: employee_id
          }
        })

        const submenuData = await submenuMasterDetails.findAll({ where: { menu_master_id: i.menu_master_id } })

        if (submenuData == '') {
          if (accessdata) {
            var updatedData = await read_write_accessrDetails.update({
              forAll,
              Write,
              Read,
              forSingle,
              Delete
            }, { where: { role_module_master_id: i.role_module_master_id, menu_master_id: i.menu_master_id, employee_id: employee_id } });
          }
          else if (accessdata == null) {

            var updatedData = await read_write_accessrDetails.create({
              role_module_master_id: role_module_master_id,
              employee_id: employee_id,
              menu_master_id: i.menu_master_id,
              forAll,
              forSingle,
              Write,
              Read,
              Delete,
            })
          }
        } else {
          for (let j of submenuData) {
            if (accessdata) {
              var updatedData = await read_write_accessrDetails.update({
                forAll,
                Write,
                Read,
                forSingle,
                Delete
              }, { where: { role_module_master_id: i.role_module_master_id, menu_master_id: i.menu_master_id, employee_id: employee_id } });
            }
            else if (accessdata == null) {

              var updatedData = await read_write_accessrDetails.create({
                role_module_master_id: role_module_master_id,
                employee_id: employee_id,
                menu_master_id: i.menu_master_id,
                submenu_master_id: j.submenu_master_id,
                forAll,
                forSingle,
                Write,
                Read,
                Delete,
              })
            }
          }
        }
      }
      return res.status(200).send({ code: 200, message: "Successfully Created Read &  Write...", data: updatedData });
    }

    else if (req.body.role_module_master_id && req.body.menu_master_id && !req.body.submenu_master_id) {
      const subMenu_data = await submenuMasterDetails.findAll({
        where: {
          menu_master_id: req.body.menu_master_id,
          role_module_master_id: req.body.role_module_master_id
        }
      })

      if (subMenu_data.length > 0) {
        for (let i of subMenu_data) {
          let accessdata = await read_write_accessrDetails.findOne({
            where: {
              menu_master_id: i.menu_master_id,
              role_module_master_id: i.role_module_master_id,
              submenu_master_id: i.submenu_master_id
            }
          })

          if (accessdata) {
            var updatedData = await read_write_accessrDetails.update({
              forAll,
              forSingle,
              Delete,
              Write,
              Read,
            }, { where: { role_module_master_id: accessdata.role_module_master_id, menu_master_id: accessdata.menu_master_id } });
          }
          else if (accessdata == null) {
            var updatedData = await read_write_accessrDetails.create({
              forAll,
              forSingle,
              Write,
              Read,
              Delete,
              menu_master_id: i.menu_master_id,
              submenu_master_id: i.submenu_master_id,
              role_module_master_id: i.role_module_master_id,
              employee_id: employee_id
            })
          }
        }
      }
      return res.status(200).send({ code: 200, message: "Assigend task Successfully!", data: updatedData });
    }

    else if (req.body.role_module_master_id && req.body.menu_master_id && req.body.submenu_master_id) {
      let new_accessdata = await read_write_accessrDetails.findOne({
        where: {
          role_module_master_id: role_module_master_id,
          menu_master_id: menu_master_id,
          submenu_master_id: submenu_master_id
        }
      })

      if (new_accessdata) {
        var updatedData = await read_write_accessrDetails.update({
          forAll,
          Write,
          Read,
          forSingle,
          Delete,
        }, {
          where: {
            role_module_master_id: new_accessdata.role_module_master_id,
            menu_master_id: new_accessdata.menu_master_id,
            submenu_master_id: new_accessdata.submenu_master_id
          }
        });
      }

      else if (new_accessdata == null) {
        var updatedData = await read_write_accessrDetails.create({
          menu_master_id: menu_master_id,
          submenu_master_id: submenu_master_id,
          role_module_master_id: role_module_master_id,
          employee_id: employee_id,
          forAll,
          forSingle,
          Write,
          Read,
          Delete,
        })
      }
    }
    return res.status(200).send({ code: 200, message: "Successfully Created...", data: updatedData });
  }
  catch (err) {
    console.log(err);
    return res.status(500).send({ code: 500, message: err.message });
  }
}


exports.getRolewise = async (req, res) => {
  try {
    const employee_id = parseInt(req.params.employee_id)
    var { role_module_master_id, submenu_master_id, menu_master_id } = req.body
    let data;

    if (role_module_master_id && submenu_master_id && menu_master_id) {
      data = await read_write_accessrDetails.findAll({
        where: {
          [Op.and]: [
            { employee_id: employee_id },
            { role_module_master_id: role_module_master_id },
            { menu_master_id: menu_master_id },
            { submenu_master_id: submenu_master_id }
          ]
        }
      })
    }
    else if (role_module_master_id && menu_master_id) {
      data = await read_write_accessrDetails.findAll({
        where: {
          [Op.and]: [
            { employee_id: employee_id },
            { role_module_master_id: role_module_master_id },
            { menu_master_id: menu_master_id },
          ]
        }
      })
    }

    else if (role_module_master_id) {
      data = await read_write_accessrDetails.findAll({
        where: {
          [Op.and]: [
            { employee_id: employee_id },
            { role_module_master_id: role_module_master_id },
          ]
        }
      })
    }

    if (data.length == 0 || data == null) {
      return res.status(403).send({ code: 403, message: "Please Enter valid params and body data " });
    }

    var obj = {
      "employee_id": data[0].employee_id,
      "role_module_master_id": data[0].role_module_master_id,
      "menu_master_id": data[0].menu_master_id,
      "submenu_master_id": data[0].submenu_master_id,
      "options": {
        "Write": data[0].Write,
        "Read": data[0].Read,
        "Delete": data[0].Delete
      }
    }

    if (data) {
      return res.status(200).send({ code: 200, message: "Assigend task Successfully!", data: obj });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ code: 500, message: err.message });
  }

}


////////////////////////////////////////////////////////////////////////////
exports.role_data = async (req, res) => {
  try {
    const role = req.body.role
    if (role == "All") {
      const role_data = await roleMenuAccessDetails.findAll()
      return res.status(200).send({ code: 200, message: "Data fetched ", data: role_data })
    }
    else if (role) {
      const role_data = await roleMenuAccessDetails.findAll({ where: { menu_master_id: role } })
      return res.status(200).send({ code: 200, message: "Data Fetched", data: role_data })
    }
    else {
      return res.status(404).send({ code: 404, message: "No role found" })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Internal Server Error" })
  }
}