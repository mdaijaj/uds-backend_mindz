const db = require("../../../models/index");


module.exports.getLeadSummaryData = async (req, res) => {
  try {
    const { user_id, from_date, to_date, status, login_id } = req.query;
    let response = [];
    const singleEmployeeList = await db.user.findAll({ where: { employee_id: login_id } })
    let role = singleEmployeeList[0]?.user_role;
    if (role == 'Super Admin') {
      const [allLead] = await db.sequelize.query(`
      SELECT DISTINCT C.* , R.first_name AS user_first_name, R.middle_name AS user_middle_name,
      R.last_name AS user_last_name,TB.branch_name
      FROM CRM_CREATE_LEAD_MST AS C 
      LEFT JOIN registered_users AS R ON R.employee_id = C.user_id
      INNER JOIN tbl_branch AS TB ON TB.id = R.branch_id
      WHERE JSON_UNQUOTE(JSON_EXTRACT(C.dynamic_fields, '$.status')) != "Deal Closed" ORDER BY C.id DESC`)
      response = allLead;
      let filteredResponse = response;
      if (user_id || status || from_date || to_date) {
        filteredResponse = filteredResponse.filter(item => {
          const user_idFilter = user_id ? item.login_id == user_id : true;
          const statusFilter = status ? item.dynamic_fields.status === status : true;
          const createdAt = new Date(item.createdAt); 
          const fromDateFilter = from_date ? new Date(from_date) <= createdAt : true;
          const toDateFilter = to_date ? createdAt <= new Date(to_date) : true;
  
          return user_idFilter && statusFilter && fromDateFilter && toDateFilter;
        });
      }
      if (filteredResponse.length > 0) {
        return res.status(200).send({ code: 200, message: "Get Data Successfully", data: filteredResponse });
      } else {
        return res.status(404).send({ code: 404, message: "No Data Found " });
      }
    }
    else {
      const [selfData] = await db.sequelize.query(`
      SELECT DISTINCT C.* , R.first_name AS user_first_name, R.middle_name AS user_middle_name,
      R.last_name AS user_last_name,TB.branch_name 
      FROM CRM_CREATE_LEAD_MST AS C 
      LEFT JOIN registered_users AS R ON R.employee_id = C.user_id
      INNER JOIN tbl_branch AS TB ON TB.id = R.branch_id
      LEFT JOIN CRM_ASSIGN_EMPLOYEE_MST AS CS ON CS.assign_id = C.user_id
      LEFT JOIN CRM_ASSIGN_USER_MST AS CA ON CA.id = CS.assign_user_id
      WHERE (C.user_id = ${login_id} OR CA.employee_id=${login_id}) 
      AND JSON_UNQUOTE(JSON_EXTRACT(C.dynamic_fields, '$.status')) != "Deal Closed" ORDER BY C.id DESC`)

      let filteredResponse = selfData;
    if (user_id || status || from_date || to_date) {
      filteredResponse = filteredResponse.filter(item => {
        const user_idFilter = user_id ? item.login_id == user_id : true;
        const statusFilter = status ? item.dynamic_fields.status === status : true;
        const createdAt = new Date(item.createdAt); 
        const fromDateFilter = from_date ? new Date(from_date) <= createdAt : true;
        const toDateFilter = to_date ? createdAt <= new Date(to_date) : true;

        return user_idFilter && statusFilter && fromDateFilter && toDateFilter;
      });
    }
    if (filteredResponse.length > 0) {
      return res.status(200).send({ code: 200, message: "Get Data Successfully", data: filteredResponse });
    } else {
      return res.status(404).send({ code: 404, message: "No Data Found " });
    }
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: error.message });
  }
};

module.exports.getLeadStatusData = async (req, res) => {
  try {
    const getAllStatusData = await db.models.fieldValue.findAll({
      attributes: ['id', 'field_value'],
      order: [['id', 'DESC']]
    });
    if (getAllStatusData.length > 0) {
      return res.status(200).send({ code: 200, message: "Get Data Successfully", data: getAllStatusData });
    } else {
      return res.status(404).send({ code: 404, message: "No Data Found " });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: " server error" });
  }
}

module.exports.createLeadSummary = async (req, res) => {
  try {
    const { assign_id, leadList } = req.body;

    if (!Array.isArray(leadList)) {
      return res.status(400).send({ code: 400, message: "Invalid request format. Expected an array of leads in the 'leadList' property." });
    }
    const dataExist = await db.user.findOne({ where: { employee_id: assign_id } });
    if (!dataExist) {
      return res.status(404).send({ code: 404, message: "No Data Found  " });
    }
    const updatePromises = leadList?.map(async (item) => {
      return await db.models.createLead.update(
        { login_id: assign_id },
        { where: { id: item?.create_lead_id } }
      );
    })
    const updateResults = await Promise.all(updatePromises);
    const allUpdatesSuccessful = updateResults.every(result => result[0] > 0);
    if (allUpdatesSuccessful) {
      return res.status(200).send({ code: 200, message: "Successfully Assigned" });
    } else {
      return res.status(400).send({ code: 400, message: "Failed to Assign" });
    }

  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Server error' });
  }
};