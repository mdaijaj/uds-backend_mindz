const db = require("../../../models/index");
 const  sequelize  = require("sequelize");

module.exports.createDealClosed= async (req,res)=>{
    try {
        const {proposal_id,version_id,lead_id,contract_no }=req.body;
        const dealClosed = await db.models.dealClose.create({proposal_id,version_id,contract_no});
         await db.models.createLead.update(
            {
                dynamic_fields: sequelize.literal('JSON_SET(dynamic_fields, "$.status", "Deal Closed")'),
            },
            { where: { id: lead_id } }
        );
        if(dealClosed){
            return res.status(200).send({code:200,message:'successfully created'});
        }else{
            return res.status(404).send({code:404,message : ' not created'});
        }
    } catch (error) {
        return res.status(500).send({code:500,message:error.message});
    }
}

module.exports.getDealClosedList= async (req,res)=>{
    try {
        const {login_id}=req.query;
        let condition ;
        if(login_id === 1 || login_id =='1' || login_id =='Super Admin'){
            condition = `1=1`
        }else{
            condition=`CL.login_id=${login_id} OR CP.employee_id=${login_id} OR CL.user_id=${login_id} `
        }
        const getDealClose = await db.sequelize.query(
            `SELECT C.id,C.contract_no,CP.proposal_no,CL.id AS create_lead_id,CL.company_name,
            CL.lead_owner,CL.contact_person_name,CL.contact_number,CL.mail_id, 
            CONCAT_WS(' ', R.first_name, R.last_name) AS full_name,TB.branch_name,
            DATE_FORMAT(CP.createdAt,'%Y-%m-%d') AS createdAt
            FROM CRM_PROPOSAL_DEAL_CLOSE_MST AS C
            INNER JOIN CRM_CREATE_PROPOSAL_MST AS CP ON CP.id=C.proposal_id
            INNER JOIN CRM_VERSION_PROPOSAL_MST AS CV ON CV.id=C.version_id 
            INNER JOIN CRM_CREATE_LEAD_MST AS CL ON CL.id= CP.create_lead_id
            INNER JOIN registered_users AS R ON R.employee_id=CL.user_id
            INNER JOIN tbl_branch AS TB ON TB.id = R.branch_id
            WHERE ${condition} ORDER BY C.id DESC`
        )
        if(getDealClose.length > 0){
            return res.status(200).send({code:200,message:'success',data:getDealClose[0]});
        }else{
            return res.status(404).send({code:404,message : ' not data found'});
        }
    } catch (error) {
        return res.status(500).send({code:500,message:error.message});
    }
}

module.exports.dealCloseVersionByLeadId = async (req,res) => {
    try {
        const {lead_id,login_id} = req.query;
        let condition ;
        if(login_id ===1 || login_id=='1' || login_id=='Super Admin'){
            condition = `1=1`
        }else{
            condition = `(CL.login_id=${login_id} OR C.employee_id=${login_id} OR CL.user_id=${login_id})`;
        }
        const dataList = await db.sequelize.query(
            `SELECT proposal_id, proposal_no, lead_id, version_id, version
            FROM ( SELECT DISTINCT C.id AS proposal_id, C.proposal_no, CL.id AS lead_id, PL.version_id, CV.version
            FROM CRM_CREATE_PROPOSAL_MST AS C
            INNER JOIN CRM_CREATE_LEAD_MST AS CL ON CL.id = C.create_lead_id
            INNER JOIN CRM_PROPOSAL_ASSET_LIST_MST AS PL ON PL.proposal_id = C.id
			INNER JOIN CRM_PROPOSAL_ITEM_LIST_MST AS PI ON PI.proposal_id = C.id
            INNER JOIN CRM_VERSION_PROPOSAL_MST AS CV ON CV.id = PL.version_id
            WHERE ${condition} AND CL.id=${lead_id}
            ) AS distinct_proposals
            ORDER BY version_id DESC`
        )
        if(dataList.length > 0){
            return res.status(200).send({code:200,message:"success",data:dataList[0]});
        }else{
            return res.status(404).send({code:404,message : ' not data found'});
        }
    } catch (error) {
        return res.status(500).send({code:500,message : error.message});
    }
}

module.exports.dealClosedViewById = async (req,res) => {
    try {
        const {id} = req.params;
        const dataValue = await db.models.dealClose.findOne({
            where:{id:id}
        })
        const proposalData = await db.sequelize.query(
            ` SELECT DISTINCT  C.*, CL.company_name, TB.branch_name,
            CL.lead_owner,CL.contact_person_name,CL.contact_number,CL.mail_id, 
            JSON_UNQUOTE(JSON_EXTRACT(CL.dynamic_fields, '$.status')) AS field_value,
            CONCAT_WS(' ', R.first_name, R.last_name) AS full_name,
            R.personal_email, R.mobile_number,CD.contract_no, CD.id AS deal_close_id,
            DATE_FORMAT(C.createdAt, '%Y-%m-%d') AS createdAt
            FROM CRM_CREATE_PROPOSAL_MST AS C
            INNER JOIN CRM_CREATE_LEAD_MST AS CL ON CL.id = C.create_lead_id
            INNER JOIN registered_users AS R ON R.employee_id = CL.user_id
            INNER JOIN CRM_PROPOSAL_DEAL_CLOSE_MST AS CD ON CD.proposal_id = C.id
            INNER JOIN CRM_VERSION_PROPOSAL_MST AS CV ON CV.id= CD.version_id
            INNER JOIN tbl_branch AS TB ON R.branch_id= TB.id
            WHERE CD.id = ${id} `
        )
        const assetData = await db.sequelize.query(
            `SELECT A.asset_category_code,A.asset_category_name,CP.*
            FROM CRM_CREATE_PROPOSAL_MST AS C 
            INNER JOIN CRM_PROPOSAL_ASSET_LIST_MST AS CP ON CP.proposal_id=C.id
            INNER JOIN asset_category AS A ON A.id = CP.asset_category_id
            INNER JOIN CRM_PROPOSAL_DEAL_CLOSE_MST AS CD ON CD.proposal_id = C.id
            INNER JOIN CRM_VERSION_PROPOSAL_MST AS CV ON CV.id= CD.version_id
            WHERE  CP.version_id = ${dataValue.version_id} AND CD.proposal_id = ${dataValue.proposal_id}`
        )
        const itemData = await db.sequelize.query(
            `SELECT I.item_name,I.item_code,CP.*
            FROM CRM_CREATE_PROPOSAL_MST AS C 
            INNER JOIN CRM_PROPOSAL_ITEM_LIST_MST AS CP ON CP.proposal_id=C.id
            INNER JOIN ItemMasters AS I ON I.id = CP.item_id
            INNER JOIN CRM_PROPOSAL_DEAL_CLOSE_MST AS CD ON CD.proposal_id = C.id
            INNER JOIN CRM_VERSION_PROPOSAL_MST AS CV ON CV.id= CD.version_id
            WHERE  CP.version_id = ${dataValue.version_id} AND CD.proposal_id = ${dataValue.proposal_id}`
        )
        const serviceData = await db.sequelize.query(
            `SELECT A.asset_category_name,I.item_name,S.* 
            FROM CRM_CREATE_PROPOSAL_MST AS C
            INNER JOIN CRM_PROPOSAL_SERVICE_LIST_MST AS S ON S.proposal_id=C.id
            INNER JOIN CRM_PROPOSAL_DEAL_CLOSE_MST AS CD ON CD.proposal_id = C.id
            INNER JOIN  ItemMasters AS I ON I.id= S.item_id
            INNER JOIN asset_category AS A ON A.id= S.asset_category_id
            WHERE  S.version_id = ${dataValue.version_id} AND CD.proposal_id = ${dataValue.proposal_id}`
        )
        const outVisitData = await db.sequelize.query(
            `SELECT A.asset_category_name,I.item_name,S.* 
            FROM CRM_CREATE_PROPOSAL_MST AS C
            INNER JOIN CRM_PROPOSAL_OVC_MST AS S ON S.proposal_id=C.id
            INNER JOIN CRM_PROPOSAL_DEAL_CLOSE_MST AS CD ON CD.proposal_id = C.id
            INNER JOIN  ItemMasters AS I ON I.id= S.item_id
            INNER JOIN asset_category AS A ON A.id= S.asset_category_id
            WHERE  S.version_id = ${dataValue.version_id} AND CD.proposal_id = ${dataValue.proposal_id}`
        )

        const Obj ={
            ...proposalData[0][0],
            assetList:assetData[0],
            itemList:itemData[0],
            serviceList:serviceData[0],
            outVisitList:outVisitData[0]
        }
        if (Obj) {
            return res.status(200).send({ code: 200, message: 'success', data: Obj })
        } else {
            return res.status(404).send({ code: 404, message: ' data not found ' });
        }
    } catch (error) {
        return res.status(500).send({code:500,message : error.message});
    }
}
