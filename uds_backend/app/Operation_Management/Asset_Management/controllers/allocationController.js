const { create } = require("mathjs");
const { Op } = require('sequelize');
const db = require("../../../models/index");

module.exports.getItemsByAsset = async (req, res) => {
    try {
        let items = await db.ItemMaster.findAll({ where: { asset_id: req.params.id } })
        if (items.length > 0) {
            return res.status(200).json({ code: 200, message: "Success ", data: items });
        } else {
            return res.status(404).json({ code: 404, message: "Data Not Found ", data: items });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};

module.exports.getFilteredItems = async (req, res) => {
    const {  asset_category_id,item_id,from_GRN_date,to_GRN_date, in_status } = req.body;
    try {
        
        let items = await db.ItemMaster.findAll({ where: { 
            asset_id: asset_category_id || { [Op.regexp]: '.*' },  // If asset_category_id is not null, match exactly asset_category_id, otherwise match all characters using regex
            id:  item_id || { [Op.regexp]: '.*' },
        }});
        // console.log(asset_category_id)
        // let items = await db.ItemMaster.findAll({ where :{
        //     [Op.or]: [
        //         { asset_id: asset_category_id }, // Match exactly x
        //         { asset_id: { [Op.regexp]: '.*' } } // Match all characters using regex
        //     ]
        // }})

        if (items.length > 0) {
            return res.status(200).json({ code: 200, message: "Success ", data: items });
        } else {
            return res.status(200).json({ code: 200, message: "Success ", data: null });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};


module.exports.createAllocation = async (req, res) => {
    const { item_id, allocation_type, branch_id, role_id, employee_id, remark } = req.body;
    try {
        const createdData = await db.allocation.create({
            item_id: item_id,
            allocation_type: allocation_type,
            branch_id: branch_id,
            role_id: role_id,
            employee_id: employee_id,
            remark: remark,
        });
        if (createdData) {
            return res.status(200).json({ code: 200, message: "Success ", data: createdData });
        } else {
            return res.status(200).json({ code: 200, message: "Success ", data: null });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};