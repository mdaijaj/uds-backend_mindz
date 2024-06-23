const db = require("../../../models/index");

module.exports.getSchedulingAllocationList = async(req,res)=>{
    try {
        // const allocationList = await db.models.
    } catch (error) {
        return res.status(500).send({code:500, message:error.message});
    }
}