const db = require("../../../models/index");

module.exports.createAddPo = async (req, res) => {
    try {
        const { deal_close_id, location_id, branch_id,
            po_start_date, po_end_date, po_number, upload_file, serviceList, assetList, itemList, outVisitList } = req.body;

        const dealExists = await db.models.dealClose.findOne({ where: { id: deal_close_id } });
        if (!dealExists) {
            return res.status(404).send({ code: 404, message: 'Deal Close Not Found' })
        }
        const locationExists = await db.models.contractLocation.findOne({ where: { id: location_id } });
        if (!locationExists) {
            return res.status(404).send({ code: 404, message: 'Location Not Found' })
        }
        const branchExists = await db.tbl_branch.findOne({ where: { id: branch_id } });
        if (!branchExists) {
            return res.status(404).send({ code: 404, message: 'Branch Not Found' })
        }
        const createAddPo = await db.models.addPo.create({
            deal_close_id, location_id, branch_id,
            po_start_date, po_end_date, po_number, upload_file
        })
        await Promise.all(serviceList.map(async (item) => {
            const { id, frequency, qty } = item
            await db.models.addPoService.create({
                service_id: id,
                frequency: frequency,
                qty: qty,
                add_po_id: createAddPo.id
            })
        }))
        await Promise.all(assetList.map(async (item) => {
            const { id } = item
            await db.models.addPoAsset.create({
                proposal_asset_id: id,
                add_po_id: createAddPo.id
            })
        }))
        await Promise.all(itemList.map(async (item) => {
            const { id } = item
            await db.models.addPoItem.create({
                proposal_item_id: id,
                add_po_id: createAddPo.id
            })
        }))
        await Promise.all(outVisitList.map(async (item) => {
            const { id } = item
            await db.models.addPoOVC.create({
                out_visit_cost_id: id,
                add_po_id: createAddPo.id
            })
        }))
        if (createAddPo) {
            return res.status(201).send({ code: 201, message: 'Successfully created' });
        } else {
            return res.status(404).send({ code: 404, message: 'not created' })
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
}
