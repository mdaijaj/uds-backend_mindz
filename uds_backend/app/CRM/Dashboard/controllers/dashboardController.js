const db = require("../../../models/index");

module.exports.getDashboard = async (req, res) => {
    try {
        const { id } = req.params;
        const leadData = await db.models.createLead.findAll({ where: { id: id } });
        if (leadData) {
            return res.status(200).send({ code: 200, data: billingData });
        } else {
            return res.status(404).send({ code: 404, message: 'Billing not found', data: billingData })
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
}