const db = require("../../../models/index");

module.exports.getContractList = async (req, res) => {
    try {
        const [contractList] = await db.sequelize.query(
            `SELECT C.id,C.po_number,C.po_start_date,C.po_end_date,CP.contract_no,CL.company_name,CL.lead_owner,L.location,T.branch_name
            FROM CRM_ADD_PO_MST AS C 
            INNER JOIN CRM_PROPOSAL_DEAL_CLOSE_MST AS CP ON CP.id=C.deal_close_id
            INNER JOIN CRM_CREATE_PROPOSAL_MST AS CC ON CC.id = CP.proposal_id
            INNER JOIN CRM_CREATE_LEAD_MST AS CL ON CL.id=CC.create_lead_id
            INNER JOIN CRM_CONTRACT_LOCATION_MST AS L ON L.id = C.location_id
            INNER JOIN tbl_branch AS T ON T.id = C.branch_id`
        )
        if (contractList.length > 0) {
            return res.status(200).send({ code: 200, message: 'Success', data: contractList })
        } else {
            return res.status(404).send({ code: 404, message: 'Data not found' })
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
}


module.exports.getContractDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const tempMainObj = await db.sequelize.query(
            `SELECT AP.*, CL.company_name, CL.contact_number, CC.id AS proposal_id,CV.id AS version_id,
            BR.branch_name, CLO.location, 
            CONCAT_WS(' ',  RU.first_name,RU.last_name) AS full_name
            FROM CRM_ADD_PO_MST AS AP
            INNER JOIN CRM_PROPOSAL_DEAL_CLOSE_MST AS CP ON CP.id=AP.deal_close_id
            INNER JOIN CRM_CREATE_PROPOSAL_MST AS CC ON CC.id = CP.proposal_id
            INNER JOIN CRM_CREATE_LEAD_MST AS CL ON CL.id=CC.create_lead_id
            INNER JOIN CRM_VERSION_PROPOSAL_MST AS CV ON CV.id=CP.version_id
            INNER JOIN tbl_branch AS BR ON BR.id=AP.branch_id
            INNER JOIN CRM_CONTRACT_LOCATION_MST AS CLO ON CLO.id=AP.location_id
            INNER JOIN registered_users AS RU ON RU.employee_id = CL.user_id
            WHERE AP.id = ${id}`
        )
        let mainObj = tempMainObj[0][0];

        const assetList = await db.sequelize.query(
            `SELECT APS.*, PS.qty, PS.price, PS.gst, PS.total, PS.allocation_type,
             AC.id AS asset_category_id, AC.asset_category_name
            FROM CRM_ADD_PO_ASSET_MST AS APS
            INNER JOIN CRM_PROPOSAL_ASSET_LIST_MST AS PS ON PS.id=APS.proposal_asset_id
            INNER JOIN asset_category AS AC ON AC.id=PS.asset_category_id
            WHERE APS.add_po_id = ${mainObj?.id}`
        )

        const itemList = await db.sequelize.query(
            `SELECT API.*, IM.item_name, PI.price_per_unit, PI.gst, PI.gst
           FROM CRM_ADD_PO_ITEM_MST AS API
           INNER JOIN CRM_PROPOSAL_ITEM_LIST_MST AS PI ON PI.id=API.proposal_item_id
           INNER JOIN ItemMasters AS IM ON IM.id=PI.item_id
           WHERE API.add_po_id = ${mainObj?.id}`
        )

        // const itemList = await db.sequelize.query(
        //     `SELECT CPI.*, IM.item_name
        //     FROM crm_proposal_item_list_mst AS CPI
        //     INNER JOIN itemmasters AS IM ON IM.id=CPI.item_id
        //     WHERE CPI.proposal_id = ${mainObj?.proposal_id} && CPI.version_id = ${mainObj?.version_id}`
        // )

        const serviceDataList = await db.sequelize.query(
            `SELECT APS.*, PS.id, PS.service_name,PS.price, PS.gst,PS.total,
            IM.id AS item_id, IM.item_name,AC.id AS asset_category_id, AC.asset_category_name
            FROM CRM_ADD_PO_SERVICE_MST AS APS
            INNER JOIN CRM_PROPOSAL_SERVICE_LIST_MST AS PS ON PS.id=APS.service_id
            INNER JOIN asset_category AS AC ON AC.id=PS.asset_category_id
            INNER JOIN ItemMasters AS IM ON IM.id=PS.item_id
            WHERE APS.add_po_id = ${mainObj?.id}`
        )

        const outVisitList = await db.sequelize.query(
            `SELECT OVC.*, POC.id, POC.bin_service,POC.out_visit_cost, POC.no_of_visitor,POC.gst,POC.total,
            IM.id AS item_id, IM.item_name,AC.id AS asset_category_id, AC.asset_category_name
            FROM CRM_ADD_PO_OVC_MST AS OVC
            INNER JOIN CRM_PROPOSAL_OVC_MST AS POC ON POC.id=OVC.out_visit_cost_id
            INNER JOIN asset_category AS AC ON AC.id=POC.asset_category_id
            INNER JOIN ItemMasters AS IM ON IM.id=POC.item_id
            WHERE OVC.add_po_id = ${mainObj?.id}`
        )

        let data = {
            ...mainObj,
            assetList: assetList[0],
            itemList: itemList[0],
            serviceList: serviceDataList[0],
            outVisitList: outVisitList[0],
        }

        if (data) {
            return res.status(200).send({ code: 200, message: 'Success', data: data });
        } else {
            return res.status(404).send({ code: 404, message: ' Data Not Found' });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};