const db = require("../../../models/index");

const { sendMail } = require("../../utils/mail/mail");

module.exports.getProposalCompanyData = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [companyData] = await db.sequelize.query(
            `SELECT C.id AS create_lead_id,C.company_name,TB.branch_name,
            C.lead_owner,C.contact_person_name,C.contact_number,C.mail_id, 
            CONCAT_WS(' ', R.first_name, R.last_name) AS full_name
            FROM CRM_CREATE_LEAD_MST AS C
            INNER JOIN registered_users AS R ON R.employee_id = C.user_id
            INNER JOIN tbl_branch AS TB ON TB.id = R.branch_id
            WHERE C.id = ${id}`
        )
        if (!companyData[0]) {
            return res.status(404).send({ code: 404, message: ' company data not found' });
        }
        const proposalExists = await db.models.proposalData.findOne({ where: { create_lead_id: parseInt(id) } });
        if (proposalExists) {
            const assetData = await db.sequelize.query(
                `SELECT A.asset_category_code,A.asset_category_name,CP.*
                FROM CRM_CREATE_PROPOSAL_MST AS C 
                INNER JOIN CRM_PROPOSAL_ASSET_LIST_MST AS CP ON CP.proposal_id=C.id
                INNER JOIN asset_category AS A ON A.id = CP.asset_category_id
                WHERE C.id = ${proposalExists.id}
                AND CP.createdAt = (SELECT MAX(createdAt) 
                               FROM CRM_PROPOSAL_ASSET_LIST_MST AS CP
                               WHERE CP.proposal_id = ${proposalExists.id})`
            )
            const itemData = await db.sequelize.query(
                `SELECT I.item_name,I.item_code,CP.*
                FROM CRM_CREATE_PROPOSAL_MST AS C 
                INNER JOIN CRM_PROPOSAL_ITEM_LIST_MST AS CP ON CP.proposal_id=C.id
                INNER JOIN ItemMasters AS I ON I.id = CP.item_id
                WHERE C.id = ${proposalExists.id}
                AND CP.createdAt = (SELECT MAX(createdAt) 
                FROM CRM_PROPOSAL_ASSET_LIST_MST AS CP
                WHERE CP.proposal_id = ${proposalExists.id})`
            )
            const Obj = {
                ...companyData[0], ...proposalExists.dataValues,
                assetList: assetData[0],
                itemList: itemData[0]
            }
            const assetValue = await db.sequelize.query(
                `SELECT DISTINCT IM.asset_category_id,A.asset_category_code,A.asset_category_description,A.asset_category_name
                FROM ItemMasters AS I 
                INNER JOIN ITEM_MAPPING AS IM ON IM.primary_item_id = I.id
                INNER JOIN asset_category AS A ON A.id= IM.asset_category_id
                WHERE I.use_this_item=true AND I.isDeleted= false`
            )
            const itemValue = await db.ItemMaster.findAll({
                attributes: [["id", "item_id"], ["asset_id", "asset_category_id"], "item_name", "item_code"], where: { isDeleted: false }
            })
            if (Obj) {
                return res.status(200).send({ code: 200, message: 'success', data: Obj, asset: assetValue[0], item: itemValue[0] });
            } else {
                return res.status(404).send({ code: 400, message: 'Data not found' });
            }

        } else {
            const assetData = await db.sequelize.query(
                `SELECT DISTINCT AC.asset_category_name,AC.asset_category_code,AC.asset_category_description,AC.id AS asset_category_id
                FROM CRM_LEAD_SERVICE_MST AS CL 
                INNER JOIN SYS_PRODUCT_SERVICE_MST AS P ON P.id= CL.product_service_id
                INNER JOIN SYS_PRODUCT_ASSET_ITEM_MST AS PA ON PA.product_service_id = P.id
                INNER JOIN asset_category AS AC ON AC.id = PA.asset_category_id 
                WHERE CL.lead_id = ${companyData[0].create_lead_id}`
            )
            const itemData = await db.sequelize.query(
                `SELECT DISTINCT CL.id AS lead_service_id,CL.lead_id,CL.product_service_id,P.service_name,
                I.item_name,I.item_code,I.id AS item_id,PA.asset_category_id
                FROM CRM_LEAD_SERVICE_MST AS CL 
                INNER JOIN SYS_PRODUCT_SERVICE_MST AS P ON P.id= CL.product_service_id
                INNER JOIN SYS_PRODUCT_ASSET_ITEM_MST AS PA ON PA.product_service_id = P.id
                INNER JOIN ItemMasters AS I ON I.id = PA.item_id
                WHERE CL.lead_id = ${companyData[0].create_lead_id}`
            )
            const Obj = {
                ...companyData[0],
                assetList: assetData[0],
                itemList: itemData[0]
            }
            const assetValue = await db.sequelize.query(
                `SELECT DISTINCT IM.asset_category_id,A.asset_category_code,A.asset_category_description,A.asset_category_name
                FROM ItemMasters AS I 
                INNER JOIN ITEM_MAPPING AS IM ON IM.primary_item_id = I.id
                INNER JOIN asset_category AS A ON A.id= IM.asset_category_id
                WHERE I.use_this_item=true AND I.isDeleted= false`
            )
            const itemValue = await db.ItemMaster.findAll({
                attributes: [["id", "item_id"], ["asset_id", "asset_category_id"], "item_name", "item_code"], where: { isDeleted: false }
            })
            if (companyData) {
                return res.status(200).send({ code: 200, message: 'success', data: Obj, asset: assetValue[0], item: itemValue });
            } else {
                return res.status(404).send({ code: 400, message: 'Data not found' });
            }
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Server error' });
    }
};

module.exports.createProposal = async (req, res) => {
    try {
        const { id, proposal_no, osc, no_of_service, osc_gst,
            osc_total, tot_purchase, tot_gst, tot_total, tr_purchase,
            tr_gst, tr_total, tos_charge, tos_gst,
            tos_total, from_date, to_date, create_lead_id, employee_id, assetList, itemList, serviceList, outVisitList } = req.body;

        const leadExists = await db.models.createLead.findOne({ where: { id: create_lead_id } });
        if (!leadExists) {
            return res.status(404).send({ code: 404, message: 'Lead not found' });
        }
        const proposalExists = await db.models.proposalData.findOne({ where: { create_lead_id: leadExists.id } });
        if (!proposalExists) {
            const existingProposalsCount = await db.models.proposalData.count({ where: { id: null } });
            const nextVersion = existingProposalsCount + 1;
            const versionId = `V${nextVersion}`;

            const proposalObject = {
                proposal_no, osc, no_of_service, osc_gst,
                osc_total, tot_purchase, tot_gst, tot_total, tr_purchase,
                tr_gst, tr_total, tos_charge, tos_gst,
                tos_total, create_lead_id, employee_id,
                from_date, to_date
            };
            if (employee_id) {
                await sendMail(req.body.mail_id);
            }

            const createdProposal = await db.models.proposalData.create(proposalObject);
            const createVersion = await db.models.versionData.create({ version: versionId, proposal_id: createdProposal.id })
            const createdAssetList = await Promise.all(assetList.map(async (product) => {
                const { allocation_type, qty, price, gst, total, location, asset_category_id, frequency } = product;
                return await db.models.proposalAssetList.create({
                    allocation_type, qty, price, gst, total, location, frequency,
                    proposal_id: createdProposal.id,
                    asset_category_id: asset_category_id,
                    version_id: createVersion.id
                });
            }));
            await Promise.all(itemList.map(async (item) => {
                const { price_per_unit, gst, total, item_id, location, asset_category_id } = item;
                return await db.models.proposalItemList.create({
                    price_per_unit, gst, total, location, asset_category_id,
                    proposal_id: createdProposal.id,
                    item_id: item_id,
                    version_id: createVersion.id
                });
            }));
            await Promise.all(serviceList.map(async (service) => {
                const {service_name,  price, gst, total,asset_category_id, item_id} = service;
                await db.models.proposalServiceList.create({
                    service_name,  price, gst, total,asset_category_id, item_id,
                    proposal_id:createdProposal.id,
                    version_id: createVersion.id 
                })
            }))
            await Promise.all(outVisitList.map(async (visit) => {
                const {bin_service, out_visit_cost, no_of_visitor, gst, total,asset_category_id, item_id,} = visit;
                await db.models.proposalOutVisitCost.create({
                    bin_service, out_visit_cost, no_of_visitor, gst, total,
                    proposal_id:createdProposal.id, 
                    version_id: createVersion.id,
                    asset_category_id, item_id
                })
            }))
            if (createdProposal && createdAssetList) {
                return res.status(201).send({ code: 201, message: 'Created successfully' });
            } else {
                return res.status(404).send({ code: 404, message: 'Data not found' });
            }
        } else {
            const existingProposalsCount = await db.models.versionData.count({
                where: { proposal_id: proposalExists.id }
            });
            const nextVersion = existingProposalsCount + 1;
            const versionId = `V${nextVersion}`;

            const proposalObject = {
                proposal_no, osc, no_of_service, osc_gst,
                osc_total, tot_purchase, tot_gst, tot_total, tr_purchase,
                tr_gst, tr_total, tos_charge, tos_gst,
                tos_total, create_lead_id, employee_id,
                from_date, to_date,
                new_version:false
            };
            if (employee_id) {
                await sendMail(req.body.mail_id);
            }
            const createdProposal = await db.models.proposalData.update(proposalObject, { where: { id: proposalExists.id } });
            const createVersion = await db.models.versionData.create({ version: versionId, proposal_id: proposalExists.id })
            const createdAssetList = await Promise.all(assetList.map(async (product) => {
                const { allocation_type, qty, price, gst, total, location, asset_category_id, frequency } = product;
                return await db.models.proposalAssetList.create({
                    allocation_type, qty, price, gst, total, location, frequency,
                    proposal_id: proposalExists.id,
                    asset_category_id: asset_category_id,
                    version_id: createVersion.id
                });
            }));

            await Promise.all(itemList.map(async (item) => {
                const { price_per_unit, gst, total, item_id, location, asset_category_id } = item;
                return await db.models.proposalItemList.create({
                    price_per_unit, gst, total, location, asset_category_id,
                    proposal_id: proposalExists.id,
                    item_id: item_id,
                    version_id: createVersion.id
                });
            }));
            await Promise.all(serviceList.map(async (service) => {
                const {service_name, price, gst, total,asset_category_id, item_id} = service;
                await db.models.proposalServiceList.create({
                    service_name, price, gst, total,asset_category_id, item_id,
                    proposal_id:proposalExists.id,
                    version_id: createVersion.id
                })
            }))
            await Promise.all(outVisitList.map(async (visit) => {
                const {bin_service, out_visit_cost, no_of_visitor, gst, total,asset_category_id, item_id} = visit;
                await db.models.proposalOutVisitCost.create({
                    bin_service, out_visit_cost, no_of_visitor, gst, total,
                    proposal_id:proposalExists.id,
                    asset_category_id, item_id,
                    version_id: createVersion.id
                })
            }))
            if (createdProposal && createdAssetList) {
                return res.status(201).send({ code: 201, message: 'Created successfully' });
            } else {
                return res.status(404).send({ code: 404, message: 'Data not found' });
            }
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};

module.exports.getProposalList = async (req, res) => {
    try {
        const { status, id, login_id } = req.query;
        let condition = '';
        if (status == '0') {
            if (login_id == '1' || login_id == 'Super Admin') {
                condition = `C.proposal_status = 'pending'`
            } else {
                condition = ` (C.proposal_status = 'pending' OR C.new_version=false) AND  C.employee_id=${login_id} `
            }
        } else if (status == '1') {
            if (login_id == '1' || login_id == 'Super Admin') {
                condition = `C.proposal_status = 'approved'`
            } else {
                condition = `C.proposal_status = 'approved' AND  C.employee_id=${login_id}`
            }
        } else if (status == '2') {
            if (login_id == '1' || login_id == 'Super Admin') {
                condition = `C.proposal_status = 'rejected'`
            } else {
                condition = ` C.proposal_status = 'rejected' AND  C.employee_id=${login_id}`
            }
        } else if (status == '3') {
            if (login_id == '1' || login_id == 'Super Admin') {
                condition = `1=1`
            } else {
                condition = ` 1=1 AND CL.user_id=${login_id} `
            }
        } else if (status == '4') {
            if (login_id == '1' || login_id == 'Super Admin') {
                condition = `C.proposal_status = 'approved'`
            } else {
                condition = `C.proposal_status = 'approved'`
            }

        } else if (id) {
            condition = ` C.id = '${id}'`
        } else {
            condition = `1=1`
        }
        let loginIdCondition = '';
        if (login_id !== '1' && login_id !== 'Super Admin') {
            loginIdCondition = ` AND (CL.login_id=${login_id} OR CA.employee_id = ${login_id} OR C.employee_id=${login_id} OR CL.user_id=${login_id})`;
        }
        const result = await db.sequelize.query(`
        SELECT DISTINCT  C.*, CL.company_name,
        CL.lead_owner,CL.contact_person_name,CL.contact_number,CL.mail_id, 
        JSON_UNQUOTE(JSON_EXTRACT(CL.dynamic_fields, '$.status')) AS field_value,
        CONCAT_WS(' ', R.first_name, R.last_name) AS full_name,TB.branch_name ,
        R.personal_email, R.mobile_number,
        DATE_FORMAT(C.createdAt, '%Y-%m-%d') AS createdAt
        FROM CRM_CREATE_PROPOSAL_MST AS C
        INNER JOIN CRM_CREATE_LEAD_MST AS CL ON CL.id = C.create_lead_id
        INNER JOIN registered_users AS R ON R.employee_id = CL.user_id
        INNER JOIN tbl_branch AS TB ON TB.id = R.branch_id
        LEFT JOIN CRM_ASSIGN_EMPLOYEE_MST AS CS ON CS.assign_id = CL.user_id
        LEFT JOIN CRM_ASSIGN_USER_MST AS CA ON CA.id = CS.assign_user_id
        WHERE ${condition} ${loginIdCondition}  ORDER BY C.id DESC`
        );

        if (id) {
           const assetData = await db.sequelize.query(
                `SELECT A.asset_category_code,A.asset_category_name,CP.*
                FROM CRM_CREATE_PROPOSAL_MST AS C 
                INNER JOIN CRM_PROPOSAL_ASSET_LIST_MST AS CP ON CP.proposal_id=C.id
                INNER JOIN asset_category AS A ON A.id = CP.asset_category_id
                WHERE C.id = ${id} 
                AND CP.createdAt = (SELECT MAX(createdAt) 
                               FROM CRM_PROPOSAL_ASSET_LIST_MST AS CP
                               WHERE CP.proposal_id = ${id})`
            )
            const itemData = await db.sequelize.query(
                `SELECT I.item_name,I.item_code,CP.*
                FROM CRM_CREATE_PROPOSAL_MST AS C 
                INNER JOIN CRM_PROPOSAL_ITEM_LIST_MST AS CP ON CP.proposal_id=C.id
                INNER JOIN ItemMasters AS I ON I.id = CP.item_id
                WHERE C.id = ${id}
                AND CP.createdAt = (SELECT MAX(createdAt) 
                FROM CRM_PROPOSAL_ITEM_LIST_MST AS CP
                WHERE CP.proposal_id = ${id})`
            )
            const serviceData = await db.sequelize.query(
                `SELECT A.asset_category_name,I.item_name,S.* 
                FROM CRM_CREATE_PROPOSAL_MST AS C
                INNER JOIN CRM_PROPOSAL_SERVICE_LIST_MST AS S ON S.proposal_id=C.id
                INNER JOIN  ItemMasters AS I ON I.id= S.item_id
                INNER JOIN asset_category AS A ON A.id= S.asset_category_id
                WHERE C.id = ${id}
                AND S.createdAt = (SELECT MAX(createdAt) 
                FROM CRM_PROPOSAL_SERVICE_LIST_MST AS S
                WHERE S.proposal_id = ${id})`
            )
            const outVisitData = await db.sequelize.query(
                `SELECT A.asset_category_name,I.item_name,S.* 
                FROM CRM_CREATE_PROPOSAL_MST AS C
                INNER JOIN CRM_PROPOSAL_OVC_MST AS S ON S.proposal_id=C.id
                INNER JOIN  ItemMasters AS I ON I.id= S.item_id
                INNER JOIN asset_category AS A ON A.id= S.asset_category_id
                WHERE C.id = ${id}
                AND S.createdAt = (SELECT MAX(createdAt) 
                FROM CRM_PROPOSAL_OVC_MST AS S
                WHERE S.proposal_id = ${id})`
            )
            const Obj = {
                ...result[0][0],
                assetList: assetData[0],
                itemList: itemData[0],
                serviceList:serviceData[0],
                outVisitList:outVisitData[0]
            }

            return res.status(200).send({ code: 200, message: 'success', data: Obj });
        }
        if (result.length > 0) {
            return res.status(200).send({ code: 200, message: 'success', data: result[0] });
        } else {
            return res.status(404).send({ code: 404, message: ' data not found ', data: result });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Server error' });
    }
}

module.exports.updateProposalStatus = async (req, res) => {
    try {
        const { proposal_status, id } = req.body;
        const dataExists = await db.models.proposalData.findOne({
            where: { id }
        })
        if (!dataExists) {
            return res.status(404).send({ code: 404, message: 'Proposal not found' });
        }
        const statusChange = await db.models.proposalData.update({
            proposal_status: proposal_status,
            new_version:true
        }, { where: { id: id } });
        await db.models.versionData.update({
            version_status:'approved',
        },{where:{proposal_id:id}})
        if (statusChange) {
            await sendMail(
                dataExists.mail_id,
            );
            return res.status(200).send({ code: 200, message: 'Proposal updated successfully' });
        } else {
            return res.status(404).send({ code: 404, message: 'Not Updated' });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Server error' });
    }
}

module.exports.proposalVersionList = async (req, res) => {
    try {
        const { id } = req.query;

        const versionList = await db.sequelize.query(
            `SELECT DISTINCT CI.id,CP.id AS proposal_id, CP.proposal_no, 
            DATE_FORMAT(CP.createdAt, '%Y-%m-%d')  AS createdAt, CI.version
            FROM CRM_CREATE_PROPOSAL_MST AS CP
            INNER JOIN CRM_CREATE_LEAD_MST AS C ON C.id = CP.create_lead_id
            INNER JOIN CRM_PROPOSAL_ASSET_LIST_MST AS CL ON CL.proposal_id=CP.id
			INNER JOIN CRM_VERSION_PROPOSAL_MST AS CI ON CI.id = CL.version_id
            WHERE CI.proposal_id = ${id} AND CI.version_status='approved' ORDER BY CI.id DESC`
        );

        if (versionList.length > 0) {
            return res.status(200).send({ code: 200, message: "success", data: versionList[0] });
        } else {
            return res.status(404).send({ code: 404, message: "data not found", data: versionList[0] });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Server error' });
    }
};

module.exports.proposalVersionListById = async (req, res) => {
    try {
        const { id, proposal_id } = req.query;
        const proposalData = await db.sequelize.query(
            `SELECT CP.*,C.id AS create_lead_id,C.company_name,
            C.lead_owner,C.contact_person_name,C.contact_number,C.mail_id,
            CONCAT_WS(' ', R.first_name, R.last_name) AS full_name
            FROM CRM_VERSION_PROPOSAL_MST AS CV
            INNER JOIN CRM_CREATE_PROPOSAL_MST AS CP ON CP.id = CV.proposal_id
            INNER JOIN CRM_CREATE_LEAD_MST AS C ON C.id = CP.create_lead_id
            INNER JOIN registered_users AS R ON R.employee_id = C.user_id
            WHERE CV.id = ${id}`
        )

        
        const assetData = await db.sequelize.query(
            `SELECT A.asset_category_code,A.asset_category_name,CP.*
            FROM CRM_CREATE_PROPOSAL_MST AS C 
            INNER JOIN CRM_PROPOSAL_ASSET_LIST_MST AS CP ON CP.proposal_id=C.id
            INNER JOIN asset_category AS A ON A.id = CP.asset_category_id
            WHERE C.id = ${proposal_id} AND CP.version_id = ${id}`
        )
        const itemData = await db.sequelize.query(
            `SELECT I.item_name,I.item_code,CP.*
            FROM CRM_CREATE_PROPOSAL_MST AS C 
            INNER JOIN CRM_PROPOSAL_ITEM_LIST_MST AS CP ON CP.proposal_id=C.id
            INNER JOIN ItemMasters AS I ON I.id = CP.item_id
            WHERE C.id = ${proposal_id} AND CP.version_id = ${id}`
        )
        const serviceData = await db.sequelize.query(
            `SELECT A.asset_category_name,I.item_name,S.* 
            FROM CRM_CREATE_PROPOSAL_MST AS C
            INNER JOIN CRM_PROPOSAL_SERVICE_LIST_MST AS S ON S.proposal_id=C.id
            INNER JOIN  ItemMasters AS I ON I.id= S.item_id
            INNER JOIN asset_category AS A ON A.id= S.asset_category_id
            WHERE C.id = ${proposal_id} AND S.version_id = ${id}`
        )
        const outVisitData = await db.sequelize.query(
            `SELECT A.asset_category_name,I.item_name,S.* 
            FROM CRM_CREATE_PROPOSAL_MST AS C
            INNER JOIN CRM_PROPOSAL_OVC_MST AS S ON S.proposal_id=C.id
            INNER JOIN  ItemMasters AS I ON I.id= S.item_id
            INNER JOIN asset_category AS A ON A.id= S.asset_category_id
            WHERE C.id = ${proposal_id} AND S.version_id = ${id}`
        )
        const Obj = {
            ...proposalData[0][0],
            assetList: assetData[0],
            itemList: itemData[0],
            serviceList:serviceData[0],
            outVisitList:outVisitData[0]
        }

        if (Obj) {
            return res.status(200).send({ code: 200, message: 'success', data: Obj })
        } else {
            return res.status(404).send({ code: 404, message: ' data not found ' });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
}