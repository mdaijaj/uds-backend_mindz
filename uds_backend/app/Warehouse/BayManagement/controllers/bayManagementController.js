const { create } = require("mathjs");
const db = require("../../../models/index");
const bayBlockBay = require("../model/bayBlockBay");

module.exports.createBayManagement = async (req, res) => {
    try {
        const {total_no_of_block, warehouse_id,plant_id,blockList,blockBayList} = req.body;
            
            const createData = await db.bayManagement.create({total_no_of_block, warehouse_id:warehouse_id,plant_id});
            let j = 0;
            await  Promise.all(blockList.map(async(item)=>{
                const {block_name,no_of_bays,isDeleted} = item ;
                let createBlockData = await db.bayBlock.create({
                    bay_id:createData.id,
                    isDeleted,
                    block_name,
                    no_of_bays
                })

                for ( let i = 0 ; i < no_of_bays; i++) {
                    const { bay_number, no_of_racks, isDeleted } = blockBayList[j];
                    await db.bayBlockBay.create({
                        block_id:createBlockData.id,
                        bay_number,
                        no_of_racks,
                        isDeleted
                    })
                    j++;  
                }
            }))
        if (createData) {
            return res.status(201).send({ code: 201, message: "Successfully created", id : createData.id });
        } else {
            return res.status(404).send({ code: 404, message: "Data not found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};

module.exports.updateBayManagement = async (req, res) => {
    try {
        const {total_no_of_block, warehouse_id,plant_id,blockList,blockBayList} = req.body;
        let bayManagement = await db.bayManagement.findOne({ where : { id : req.query.bay_id }})
        if ( bayManagement ) {
            const updateData = await db.bayManagement.update(
                {
                    total_no_of_block,
                    warehouse_id:warehouse_id,
                    plant_id
                },
                { where: { id: req.query.bay_id } }
            );

            await  Promise.all(blockList.map(async(item)=>{
                const {block_name,no_of_bays,isDeleted} = item ;
                let createBlockData = await db.bayBlock.create({
                    bay_id:req.query.bay_id,
                    block_name,
                    no_of_bays,
                    isDeleted
                })
            }))

            if(req.query.block_id) {
                for ( let i = 0 ; i < blockBayList.length ; i++) {
                    const { bay_number, no_of_racks, isDeleted } = blockBayList[i];
                    await db.bayBlockBay.create({
                        block_id:req.query.block_id,
                        bay_number,
                        no_of_racks,
                        isDeleted
                    })
                }
            }

            if (updateData) {
                return res.status(201).send({ code: 201, message: "Successfully  updated" });
            } else {
                return res.status(404).send({ code: 404, message: "Data not found" });
            }
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};

module.exports.getBayManagementByPlantAndWarehouse = async (req, res) => {
    try {
        let bayManagement = await db.bayManagement.findOne({ where : { plant_id : req.query.plant_id , warehouse_id : req.query.warehouse_id }})   
        if (bayManagement) {
            return res.status(200).json({code: 200,message: "Success ",data: bayManagement});
        }else {
            return res.status(200).json({code: 200,message: "Success ",data: null});
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};

module.exports.getBayManagementList = async(req, res, next) => {
    try {
        console.log("==========================")
        const dataList  = await db.sequelize.query(
            `SELECT SUM(DISTINCT WB.no_of_bays) AS total_no_of_bays, COUNT(DISTINCT WB.block_name) AS total_no_of_block_names,
            WD.name,P.plant_name,SUM(WM.no_of_racks) AS total_no_of_racks
            FROM WAREHOUSE_BAY_MANAGEMENT_MST AS W 
            INNER JOIN WAREHOUSE_BAY_BLOCK_DETAIL_MST AS WB ON WB.bay_id = W.id
            INNER JOIN  WAREHOUSE_DETAIL_MST AS WD ON W.warehouse_id= WD.id
            INNER JOIN plant_master AS P ON P.id= W.plant_id
            INNER JOIN WAREHOUSE_BAY_BLOCK_BAY_DETAIL_MST AS WM ON WB.id = WM.block_id
            GROUP BY WD.name,P.plant_name`
        )
       
        if(dataList ) {
            return res.status(200).json({code: 200,message: "Success ",data: dataList[0]});
        }else{
            return res.status(404).json({ code : 404, message : "not data found" , data:dataList[0]});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.getBayBlockListById = async(req, res, next) => {
    try {
        const blockList = await db.bayBlock.findAll({ where: { bay_id : req.params.id }});
        if ( !blockList ) blockList = [];
        if(blockList.length >= 0) {
            return res.status(200).json({code: 200,message: "Success ",data: blockList});
        }else{
            return res.status(404).json({ code : 404, message : "blocklist not found" , data: null});
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.getBayBlockById = async(req, res, next) => {
    try {
        const block = await db.bayBlock.findOne({ where: { id : req.params.id }});
        if(block) {
            return res.status(200).json({code: 200,message: "Success ",data: block});
        }else{
            return res.status(404).json({ code : 404, message : "block not found" , data: block});
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.editBayBlock = async(req, res, next) => {
    try {             
        const  blockList  = req.body;
        await  Promise.all(blockList.map(async(item)=>{
            const block = await db.bayBlock.findOne({ where: { id : item.id }});
            if ( block ) {
                const { no_of_bays, isDeleted } = item;
                let updatedBlockData = await db.bayBlock.update({
                    no_of_bays, isDeleted
                },
                { where: { id: item.id } }
                )
            }else {
                return res.status(404).send({ code: 404, message: "One of the Block Record Not Found" });
            }
        }))
        return res.status(200).send({ code: 200, message: "Block Updated Successfull!" });
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.getBayBlockBayList = async(req, res, next) => {
    try {
        const blockBayList = await db.bayBlockBay.findAll({ where : { block_id : req.params.id }});
        if ( !blockBayList ) blockBayList = [];
        if(blockBayList.length >= 0) {
            return res.status(200).json({code: 200,message: "Success ",data: blockBayList});
        }else{
            return res.status(404).json({ code : 404, message : "blocklist not found" , data: null});
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.getBayBlockBayById = async(req, res, next) => {
    try {
        const bayBlockBay = await db.bayBlockBay.findOne({ where: { id : req.params.id }});
        if(bayBlockBay) {
            return res.status(200).json({code: 200,message: "Success ",data: bayBlockBay});
        }else{
            return res.status(404).json({ code : 404, message : "BayBlockBay not found" , data: bayBlockBay});
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.editBayBlockBay = async(req, res, next) => {
    try {             
        const {  id,bay_number,no_of_racks,block_id } = req.body;
        const bayBlockBayList = req.body;

        await  Promise.all(bayBlockBayList.map(async(item)=>{
            const blockBay = await db.bayBlockBay.findOne({ where: { id : item.id }});
            if ( blockBay ) {
                const { no_of_racks, isDeleted } = item;
                let updatedBlockBayData = await db.bayBlockBay.update({
                    no_of_racks,
                    isDeleted
                },
                { where: { id: item.id } }
                )
            }else {
                return res.status(404).send({ code: 404, message: "One of the Block Record Not Found" });
            }
        }))
        return res.status(200).send({ code: 200, message: "Block Updated Successfull!" });
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.deleteBayBlock = async(req, res, next) => {
    try {
        let delData;
        const BayBlockList = await db.bayBlock.findAll({});
        for ( let i = 0 ; i < BayBlockList.length ; i++) {
            let temp = BayBlockList[i].dataValues.id;
            delData = await db.bayBlock.destroy({where : { id : temp}})
        }
        if(delData) {
            return res.status(200).send({ code: 200, message: "BayBlock deletion Successfull!", data: delData });
        } else {
            return res.status(404).send({ code: 404, message: "BayBlock Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.deleteBayBlockBay = async(req, res, next) => {
    try {
        let delData;
        const BayBlockBayList = await db.bayBlockBay.findAll({});
        for ( let i = 0 ; i < BayBlockBayList.length ; i++) {
            let temp = BayBlockBayList[i].dataValues.id;
            delData = await db.bayBlockBay.destroy({where : { id : temp}})
        }
        if(delData) {
            return res.status(200).send({ code: 200, message: "BayBlockBay deletion Successfull!", data: delData });
        } else {
            return res.status(404).send({ code: 404, message: "BayBlockBay Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.deleteBayManagement = async(req, res, next) => {
    try {
        let delData;
        const BayManagementList = await db.bayManagement.findAll({});
        for ( let i = 0 ; i < BayManagementList.length ; i++) {
            let temp = BayManagementList[i].dataValues.id;
            delData = await db.bayManagement.destroy({where : { id : temp}})
        }

        if(delData) {
            return res.status(200).send({ code: 200, message: "BayManagement deletion Successfull!", data: delData });
        } else {
            return res.status(404).send({ code: 404, message: "BayManagement Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}


module.exports.getAllBayManagement = async(req, res, next) => {
    try {
    
        const BayManagementList = await db.bayManagement.findAll({});

        if(1) {
            return res.status(200).send({ code: 200, message: "BayManagement list  Successfull!", data: BayManagementList });
        } else {
            return res.status(404).send({ code: 404, message: "BayManagement Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}