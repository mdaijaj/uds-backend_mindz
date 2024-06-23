const db = require("../../../models/index");

module.exports.getLeadData = async (req, res) => {
  try {
    const { today_follow_up, missed_follow_up, upcoming_follow_up, id, login_id } = req.query;
    let condition = "";
    
    if (login_id === "1") {
      if (today_follow_up === "1") {
        condition += ` WHERE DATE(C.follow_up_date) = CURDATE()`;
      } 
      if (missed_follow_up === "0") {
        condition += ` WHERE C.follow_up_date < CURDATE()`;
      } 
      if (upcoming_follow_up === "2") {
        condition += ` WHERE C.follow_up_date > CURDATE()`;
      } 
      if (id) {
        condition += ` WHERE C.id = ${id}`;
      }
    } else {
      if (today_follow_up == "1") {
        condition += ` WHERE DATE(C.follow_up_date) = CURDATE() AND ( C.user_id = ${login_id} OR CA.employee_id=${login_id})`;
      } else if (missed_follow_up === "0") {
        condition += ` WHERE C.follow_up_date < CURDATE() AND ( C.user_id = ${login_id} OR CA.employee_id=${login_id})`;
      } else if (upcoming_follow_up === "2") {
        condition += ` WHERE C.follow_up_date > CURDATE() AND ( C.user_id = ${login_id} OR CA.employee_id=${login_id})`;
      } else if (id) {
        condition += ` WHERE C.id = ${id} AND ( C.user_id = ${login_id} OR CA.employee_id=${login_id})`;
      }
    }
    const query = `SELECT DISTINCT C.id, C.company_name, C.lead_owner, C.contact_person_name, C.contact_number, C.mail_id, 
    C.lead_created_date, C.follow_up_date, C.upload_image,C.address,C.user_id,C.dynamic_fields,
    DATE_FORMAT(C.createdAt, '%Y-%m-%d') AS createdAt,
    CONCAT_WS(' ',  RU.first_name,RU.middle_name,RU.last_name) AS user_name,TB.branch_name ,
    CONCAT_WS(' ', R.first_name, R.middle_name, R.last_name) AS full_name
    FROM CRM_CREATE_LEAD_MST AS C
    INNER JOIN registered_users AS RU ON RU.employee_id = C.login_id
    INNER JOIN registered_users AS R ON R.employee_id = C.user_id
    INNER JOIN tbl_branch AS TB ON TB.id = RU.branch_id
    LEFT JOIN CRM_ASSIGN_EMPLOYEE_MST AS CS ON CS.assign_id = C.user_id
    LEFT JOIN CRM_ASSIGN_USER_MST AS CA ON CA.id = CS.assign_user_id
    ${condition} 
    AND JSON_UNQUOTE(JSON_EXTRACT(C.dynamic_fields, '$.status')) != "Deal Closed" ORDER BY C.id DESC`;
   
    const data = await db.sequelize.query(query, { replacements: { id }, type: db.sequelize.QueryTypes.SELECT });
    if (id) {
      if (data.length > 0) {
        const serviceData = await db.sequelize.query(
          `SELECT P.service_name, C.product_service_id FROM CRM_LEAD_SERVICE_MST AS C
          INNER JOIN SYS_PRODUCT_SERVICE_MST AS P ON P.id=C.product_service_id
          WHERE C.lead_id= ${id}`
        )
        const Obj ={
          ...data[0],
          leadServiceList:serviceData[0]
        }
        return res.status(200).send({ code: 200, message: "Get Data Successfully", data: Obj });
      } else {
        return res.status(404).send({ code: 404, message: "No Data Found " });
      }
    } else {
      return res.status(200).send({ code: 200, message: "Get All Data Successfully", data: data });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

module.exports.getStatusName = async (req, res) => {
  try {
    const { id } = req.params;
    const getStatusNameData = await db.sequelize.query(
      `SELECT C.id,C.field_value FROM CRM_FIELD_VALUE_MST  AS C
      INNER JOIN CRM_LEAD_FORM_SETUP_MST AS R ON R.id= C.lead_form_id
      WHERE R.id = ${id} `
    );
    if (getStatusNameData) {
      const fieldName = await db.models.leadFormSetup.findOne({
        where: { id: id },
        attributes: ["field_name"],
      });
      return res.status(200).send({ code: 200, message: "Success", field_detail: fieldName, data: getStatusNameData[0] });
    } else {
      return res.status(404).send({ code: 404, message: "Not Created" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

module.exports.getFormDetails = async (req, res) => {
  try {
    const getFieldNameData = await db.sequelize.query(`
      SELECT L.id, L.field_name, F.field_type,L.mandatory, FV.field_value, F.id AS Field_type_id
      FROM CRM_LEAD_FORM_SETUP_MST AS L
      INNER JOIN SYS_FIELD_TYPE_MST AS F ON F.id = L.field_type_id
      LEFT JOIN CRM_FIELD_VALUE_MST AS FV ON FV.lead_form_id = L.id
      WHERE L.status = '1'
    `);

    if (getFieldNameData.length > 0) {
      const groupedData = {};
      getFieldNameData[0].forEach((row) => {
        const key = `${row.field_name}-${row.field_type.toLowerCase()}`;
        if (!(key in groupedData)) {
          groupedData[key] = {
            type: row.field_type.toLowerCase(),
            field_name: row.field_name,
            mandatory: row.mandatory,
            Field_type_id:row.field_type.toLowerCase() === "dropdown"? row.Field_type_id : undefined,
            options:row.field_type.toLowerCase() === "dropdown" || row.field_type.toLowerCase() === 'multi select' ? [] : undefined,};
        }
        if (row.field_type.toLowerCase() === "dropdown" || row.field_type.toLowerCase() ==='multi select') {
          groupedData[key]?.options?.push({
            id: row.id,
            field_value: row.field_value || null,
          });
        }
      });

      const formattedData = Object.values(groupedData);

      return res.status(200).send({
        code: 200,
        message: "Success",
        data: formattedData,
      });
    } else {
      return res.status(404).send({
        code: 404,
        message: "Not Created",
      });
    }
  } catch (error) {
    return res.status(500).send({
      code: 500,
      message: "Server Error",
    });
  }
};

module.exports.viewDescription = async (req, res) => {
  try {
    const result = await db.sequelize.query(`
    SELECT C.lead_owner, DATE_FORMAT(D.createdAt, '%Y-%m-%d') AS createdAt , D.description,
    JSON_UNQUOTE(JSON_EXTRACT(C.dynamic_fields, '$.status')) AS field_value
    FROM CRM_CREATE_LEAD_MST AS C
    INNER JOIN CRM_DESCRIPTION_CREATE_MST AS D ON D.create_lead_id = C.id
    Where C.id=${req.params.id} ORDER BY C.id DESC`);
    if (result[0].length > 0) {
      return res
        .status(200)
        .send({ code: 200, message: "Success", data: result[0] });
    } else {
      return res.status(404).send({ code: 404, message: "Data Not Found " });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

module.exports.updateLeadData = async (req, res) => {
  try {
    const updateData = await db.models.createLead.update(
      {
        follow_up_date: req.body.follow_up_date,
        upload_image: req.body.upload_image,
        user_id: req.body.user_id,
        login_id: req.body.user_id ? req.body.user_id : req.body.login_id,
      },
      { where: { id: req.params.id } }
    );
    await db.models.createDescription.upsert(
      {
        description: req.body.description,
        create_lead_id: req.params.id,
      },
      { where: { create_lead_id: req.params.id } }
    );
    if (updateData) {
      return res
        .status(200)
        .send({ code: 200, message: "Updated Successfully" });
    } else {
      return res.status(400).send({ code: 400, message: "Failed to Update" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: " Server Error" });
  }
};

module.exports.createLead = async (req, res) => {
  try {
    const { leadServiceList, user_id, login_id } = req.body;
    const mainFields = {
      user_id: user_id,
      login_id: login_id,
      company_name: req.body.company_name,
      lead_owner: req.body.lead_owner,
      contact_person_name: req.body.contact_person_name,
      contact_number: req.body.contact_number,
      mail_id: req.body.mail_id,
      address: req.body.address,
      lead_created_date: req.body.lead_created_date,
      follow_up_date: req.body.follow_up_date,
      upload_image: req.body.upload_image,
    };
    const dynamicFields = Object.keys(req.body)
      .filter((key) => !(key in mainFields))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});
    const dynamicData = dynamicFields;
    const createData = await db.models.createLead.create({
      ...mainFields,
      dynamic_fields: dynamicData,
    });

    await db.models.createDescription.create({
      create_lead_id: createData.id,
      description: req.body.description,
    });
    await Promise.all(leadServiceList.map(async(item)=>{
      const {product_service_id} = item;
      await db.models.leadService.create({
        lead_id: createData.id,
        product_service_id: product_service_id,
      });
    }));
    if (createData) {
      return res.status(201).send({ code: 201, message: "Created Successfully" });
    } else {
      return res.status(400).send({ code: 400, message: "Failed to Create Lead" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

