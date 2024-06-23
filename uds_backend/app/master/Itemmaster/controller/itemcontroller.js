const db = require("../../../models/index");
const Sequelize = require('sequelize');
const itemSpecificationModel = require('../model/itemSpecificationModel');
const itemSpecifications = db.itemSpecification;
const ItemMasters = db.ItemMaster;
const asset = db.asset
const tbl_uom = db.uomdetails

//============= Create Item ==============//

exports.createItem = async (req, res) => {
    try {
        const {
            asset_id, item_name, MVP, uom_id, Bar_QR_Code, description, threshold_stock,use_this_item,itemNameList,manage_by
        } = req.body;
     
        const allItemSpecification = req.body.itemSpecification;
        let main_specification = JSON.parse(allItemSpecification);
      
        const item_code = btoa(Math.random()).slice(0, 10).toUpperCase();
        let image = "";
     
        if (req.file && req.file['filename'] && req.file['filename'].length > 0) {
            image = req.file.path;
        } else {
            image = "";
        }
        const Item = await ItemMasters.findOne({
            where: { item_name:item_name,isDeleted:false}
        })
        if (Item) {
            return res.status(403).send({ code: 403, message: "Item  Already Exists" })
        } else if (!Item) {
         
            const item_image = image.replace(/\\/g, '/');
            const createData = await ItemMasters.create({
                item_name, asset_id, item_code, MVP, uom_id, Bar_QR_Code, threshold_stock,
                description, item_document: item_image,use_this_item,manage_by
            })
            let response;
            if (createData) {
                for (let i = 0; i < main_specification.length; i++) {
                    response = await itemSpecifications.create({
                        item_id: createData.id,
                        specificationType: main_specification[i].specificationType,
                        specificationDetails: main_specification[i].specificationDetails
                    });
                }
            }
            if (use_this_item === "1") {
                let itemValue = JSON.parse(itemNameList);
                await Promise.all(itemValue.map(async (asset) => {
                    const { asset_id, itemList } = asset;
                    await Promise.all(itemList.map(async (item) => {
                        const { item_id } = item;
                        await db.models.itemMapping.create({
                            item_id: item_id,
                            asset_category_id: asset_id,
                            primary_item_id:createData.id
                        });
                    }));
                }));
            }
            
            
            return res.status(201).json({
                code: 201, message: "Item Created Successfully",
            })   
        }
    } catch (error) {
      
        return res.status(500).send({ code: 500, message: error.message || "Server Error" })
    }
}

exports.getAllItem = async (req, res) => {
    try {
        serviceData = await ItemMasters.findAll({
            where: {
                isDeleted: false,
            },
            include: [
                {
                    model: asset,
                },
                {
                    model: tbl_uom,
                },
                {
                    model: itemSpecifications,
                    where: { isDeleted: false }
                }
            ],
            order: [['id', 'DESC']],
        });
        if (serviceData) {
            return res.status(200).send({ code: 200, message: "Get All Item data successfully", data: serviceData });
        } else {
            return res.status(404).send({ code: 404, message: "No Item found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
}

exports.getAllActiveItem = async (req, res) => {
    try {
        serviceData = await ItemMasters.findAll({
            where: {
                isDeleted: false,
                status : 'ACTIVE'
            },
            include: [
                {
                    model: asset,
                },
                {
                    model: tbl_uom,
                },
                {
                    model: itemSpecifications,
                    where: { isDeleted: false }
                }
            ],
            order: [['id', 'DESC']],
        });
        if (serviceData) {
            return res.status(200).send({ code: 200, message: "Get All Item data successfully", data: serviceData });
        } else {
            return res.status(404).send({ code: 404, message: "No Item found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
}


exports.getItemById = async (req, res) => {
    try {
        const item_id = req.params.id;
        const serviceData = await ItemMasters.findOne({
            where: {
                id: item_id,
                isDeleted: false
            },
            include: [
                {
                    model: asset,
                },
                {
                    model: tbl_uom,
                },
                {
                    model: itemSpecifications,
                    where: { isDeleted: false }
                }
            ],
        });

        const valueData = await db.sequelize.query(
            `SELECT IM.item_name,I.item_id AS item_id,A.asset_category_name,A.id AS asset_id FROM ITEM_MAPPING AS I 
            INNER JOIN ItemMasters AS IM ON I.item_id= IM.id
            INNER JOIN asset_category AS A ON A.id= I.asset_category_id 
            WHERE I.primary_item_id = ${serviceData.id}`
        );

        if (serviceData) {
            const { id, item_name, item_code, MVP, description, item_document, threshold_stock, Bar_QR_Code, status, isDeleted, use_this_item, createdAt, updatedAt, uom_id, asset_id, asset_category, tbl_uom, itemSpecifications,manage_by } = serviceData;
            const responseObj = {
                id,
                item_name,
                item_code,
                MVP,
                description,
                item_document,
                threshold_stock,
                Bar_QR_Code,
                status,
                isDeleted,
                use_this_item,
                createdAt,
                updatedAt,
                uom_id,
                asset_id,
                asset_category,
                tbl_uom,
                itemSpecifications,
                manage_by,
                "itemNameList": valueData[0].reduce((acc, item) => {
                    const existingCategory = acc.find(category => category.asset_id === item.asset_id);
                    const newItem = { item_id: item.item_id, item_name: item.item_name };
                    if (existingCategory) {
                        existingCategory.itemList.push(newItem);
                    } else {
                        acc.push({
                            asset_category_name: item.asset_category_name,
                            asset_id: item.asset_id,
                            itemList: [newItem]
                        });
                    }
                    return acc;
                }, [])
            };
            return res.status(200).send({ code: 200, message: "Get Item data successfully", data: responseObj });
        } else {
            return res.status(404).send({ code: 404, message: "No Item found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
}

exports.updateItemMaster = async(req , res) =>{
    try {
        const Item_id = req.params.id
        const {
            asset_id, item_name, MVP, uom_id,manage_by, Bar_QR_Code, description, threshold_stock,use_this_item,itemNameList
        } = req.body;

        const getAllData = await ItemMasters.findOne({
            include:[
                {
                    model:itemSpecifications
                }
            ],
            where: { id: Item_id } 
        });
        const allItemSpecification = req.body.itemSpecification || '[]'
        let main_specification= JSON.parse(allItemSpecification);

        let image = "";
        if (req.file && req.file['filename'] && req.file['filename'].length > 0) {
            image = req.file.path;
        } else {
            image = "";
        }

        if (getAllData) {
            const item_image = image.replace(/\\/g, '/');
            const updateData = await ItemMasters.update({
                asset_id, item_name, MVP, uom_id,manage_by, Bar_QR_Code,threshold_stock, description, item_document: item_image
            },
                {
                    where: { id: Item_id }
                });
            let response;
            if (updateData) {
                await itemSpecifications.destroy({ where: { item_id: Item_id } });

                for (let i = 0; i < main_specification.length; i++) {
                    response = await itemSpecifications.create({
                        item_id: Item_id,
                        specificationType: main_specification[i].specificationType,
                        specificationDetails: main_specification[i].specificationDetails
                    });
                }

                const updatedItemWithSpecifications = await ItemMasters.findOne({
                    include: [{
                        model: itemSpecifications
                    }],
                    where: { id: Item_id },
                });
                if(use_this_item == "1"){
                    await ItemMasters.update({
                        use_this_item: 1
                    },{where:{id:getAllData.id}})
                    await db.models.itemMapping.destroy({where:{primary_item_id:getAllData.id}});
                    let itemValue = JSON.parse(itemNameList);
                    await Promise.all(itemValue.map(async (asset) => {
                        const { asset_id, itemList } = asset;
                        await Promise.all(itemList.map(async (item) => {
                            const { item_id } = item;
                            await db.models.itemMapping.create({
                                item_id: item_id,
                                asset_category_id: asset_id,
                                primary_item_id:getAllData.id
                            });
                        }));
                    }));
                }
                if(use_this_item == "0"){
                    await ItemMasters.update({
                        use_this_item: 0
                    },{where:{id:getAllData.id}})
                    await db.models.itemMapping.destroy({where:{primary_item_id:getAllData.id}});
                }
                return res.status(200).send({
                  code: 200,
                  message: "Item updated successfully",
                  data: updatedItemWithSpecifications
                });
            }
            
        } else {
            return res.status(404).send({ code: 403, message: "Data not found" });
        };
    } catch (error) {
        return res.status(500).send({ code : 500, message: error.message || "Internal Server Error"});
    }
}  

exports.deleteItemMaster = async (req, res) => {
    try {
        const id = req.params.id
        const getAllData = await ItemMasters.findOne({ where: { id: id } });
        if (getAllData) {
            await ItemMasters.update({ isDeleted: true }, { where: { id: id } });
            return res.status(200).send({ code: 200, message: "Item is Deleted Successfully!", });
        } else {
            return res.status(404).send({ code: 403, message: "Data not found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
}

exports.updateItemStatus = async (req, res) => {
    try {
        const Item_id = req.params.itemId;
        const { status } = req.body;
        const editData = await ItemMasters.findOne({ where: { id: Item_id } });
        if (editData) {
            const updateData = await ItemMasters.update(
                {
                    status
                }, { where: { id: Item_id } }
            );
            return res.status(200).send({ code: 200, message: "Status Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}






