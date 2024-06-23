const { exp } = require("mathjs");
const db = require("../../../models");
const path = require('path');
const Sequelize = require('sequelize');

exports.createGRN = async (req, res) => {
    try {
        const { invoiceNo, invoiceDate, grnStatus, PO_Id, item } = req.body;
        let formattedUploadDoc = '';
        const itemValue = JSON.parse(item)
        if (req.file) {
            formattedUploadDoc = req.file.path.replace(/\\/g, '/');
        }
        const grnExists = await db.grnPurchase.findOne({ where: { invoiceNo, isDeleted: false } });
        if (grnExists) {
            return res.status(400).json({ code: 400, message: "GRN Already Exists" });
        }
        const createdGRN = await db.grnPurchase.create({ invoiceNo, invoiceDate, grnStatus, PO_Id, invoiceDoc: formattedUploadDoc });
        await Promise.all(itemValue.map(async (singleItem) => {
            const { Item_Id, receiveQty, rejectQty } = singleItem;
            await db.grnItem.create({ grn_Id: createdGRN.id, receiveQty, rejectQty, Item_Id });
        }));
        if (createdGRN) {
            return res.status(201).json({ code: 201, message: "GRN Created Successfully" });
        } else {
            return res.status(404).send({ code: 404, message: "GRN not Created" });
        }
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message || "Internal Server Error" });
    }
};

exports.getAllGRN = async (req, res) => {
    try {
        const GrnPurchase = await db.grnPurchase.findAll({
            where: {
                isDeleted: false,
            },
            attributes: ["id", "invoiceNo", "invoiceDate", "invoiceDoc", "PO_Id", "grnStatus"],
            include: [
                {
                    model: db.grnItem,
                    attributes: ["id", "receiveQty", "rejectQty", "grn_Id", "PO_Id", "Item_Id"],
                    include: [
                        {
                            model: db.ItemMaster,
                            include: [
                                {
                                    model: db.asset,
                                    attributes: ["id", "asset_category_name"],
                                },
                                {
                                    model: db.procurement_po_items
                                }
                            ]
                        },
                        {
                            model: db.grnItemStatus,
                            attributes: ["id",
                                "batchType",
                                "batchNo",
                                "expiryDate",
                                "itemSerialNo",
                                "itemStatus",
                                "grn_Id",
                                "grn_Item_Id",
                                "Item_Id"],
                        },

                    ]
                },
                {
                    model: db.procurement_po_details,

                },

            ],
            order: [['id', 'DESC']],
        });
        if (GrnPurchase) {
            return res.status(200).send({ code: 200, message: "Get All GRN data successfully", data: GrnPurchase });
        } else {
            return res.status(404).send({ code: 404, message: "No Data found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};

exports.getbyIDGRN = async (req, res) => {
    try {
        const { id } = req.params;

        let whereCondition = {
            isDeleted: false
        };

        if (id) {
            whereCondition = {
                ...whereCondition,
                id: id
            };
        }
        const GrnPurchase = await db.grnPurchase.findAll({
            where: whereCondition,
            attributes: ["id", "invoiceNo", "invoiceDate", "invoiceDoc", "PO_Id", "grnStatus"],
            include: [
                {
                    model: db.grnItem,
                    attributes: ["id", "receiveQty", "rejectQty", "grn_Id", "PO_Id", "Item_Id"],
                    include: [
                        {
                            model: db.ItemMaster,
                            include: [
                                {
                                    model: db.asset,
                                    attributes: ["id", "asset_category_name"],
                                },
                                {
                                    model: db.procurement_po_items
                                }
                            ]
                        },
                        {
                            model: db.grnItemStatus,
                            attributes: ["id",
                                "batchType",
                                "batchNo",
                                "expiryDate",
                                "itemSerialNo",
                                "itemStatus",
                                "grn_Id",
                                "grn_Item_Id",
                                "Item_Id"],
                        },
                    ]
                },
                {
                    model: db.procurement_po_details,
                },
            ],
            order: [['id', 'DESC']],
        });
        if (GrnPurchase && GrnPurchase.length > 0) {
            return res.status(200).send({ code: 200, message: "Get All Item data successfully", data: GrnPurchase[0] });
        } else {
            return res.status(404).send({ code: 404, message: "No Item found" });
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};

exports.GRNDelete = async (req, res) => {
    try {
        const id = req.params.id
        const getAllData = await db.grnPurchase.findOne({ where: { id: id } });
        if (getAllData) {
            await db.grnPurchase.update({ isDeleted: true }, { where: { id: id } });
            return res.status(200).send({ code: 200, message: "GRN  Data is Deleted Successfully!" });
        } else {
            return res.status(404).send({ code: 403, message: "id not found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

exports.updateGRN = async (req, res) => {
    try {
        const id = req.params.id;
        const { invoiceNo, invoiceDate, grnStatus, PO_Id, item } = req.body;
        let formattedUploadDoc = '';
        const itemValue = JSON.parse(item);

        if (req.file) {
            formattedUploadDoc = req.file.path.replace(/\\/g, '/');
        }

        const existingGRN = await db.grnPurchase.findOne({ where: { id: id, isDeleted: false } });
        if (!existingGRN) {
            return res.status(404).json({ code: 404, message: "GRN Not Found" });
        }

        await existingGRN.update(
            {
                invoiceNo,
                invoiceDate,
                grnStatus,
                PO_Id,
                invoiceDoc: formattedUploadDoc
            }
        );

        await Promise.all(itemValue.map(async (singleItem) => {
            const { Item_Id, receiveQty, rejectQty } = singleItem;
            const existingItem = await db.grnItem.findOne({ where: { grn_Id: id, Item_Id } });

            if (existingItem) {
                await existingItem.update({ receiveQty, rejectQty });
            } else {
                await db.grnItem.create({ grn_Id: id, receiveQty, rejectQty, Item_Id });
            }
        }));

        return res.status(200).json({ code: 200, message: "GRN data updated successfully!" });
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message || "Internal Server Error" });
    }
};

exports.get_all_po = async (req, res) => {
    try {
        const getData = await db.procurement_po_details.findAll({
            include:
                [
                    {
                        model: db.grnPurchase,
                        attributes: ["id", "grnStatus"],
                    },
                    {
                        model: db.procurement_po_items,
                        include:
                        {
                            model: db.ItemMaster,
                        },
                    },
                ]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Get Data Succssesfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};

exports.get_all_po_id = async (req, res) => {
    try {
        const { id } = req.params;

        const getData = await db.procurement_po_details.findOne({
            where: { id, isDeleted: false },
            include: [
                {
                    model: db.procurement_po_items,
                    include: [
                        {
                            model: db.ItemMaster,
                            include: [
                                {
                                    model: db.asset,
                                },
                            ]
                        },
                        {
                            model: db.grnItem,
                            attributes: [['id', 'grn_item_id'], 'receiveQty', 'rejectQty', 'status', 'po_item_id'],
                            include: [
                                {
                                    model: db.grnItemStatus,
                                    attributes: ['itemStatus', 'batchType', 'grn_Item_Id']
                                }
                            ]
                        },
                    ]
                }
            ]
        });

        if (getData) {
            const modifiedData = getData.toJSON();
            modifiedData.po_item_details.forEach(poItem => {
                if (poItem.grn_items.length > 0) {
                    poItem.ItemMaster.receiveQty = poItem.grn_items[0].receiveQty;
                    poItem.ItemMaster.grn_item_id = poItem.grn_items[0].grn_item_id;
                    poItem.ItemMaster.rejectQty = poItem.grn_items[0].rejectQty;


                    let rejectedCount = 0;

                    poItem.grn_items.forEach(grnItem => {
                        grnItem.grn_item_statuses.forEach(status => {
                            if (status.itemStatus === 'REJECTED') {
                                rejectedCount++;
                            }
                        });
                    });

                    poItem.ItemMaster.rejectedCount = rejectedCount;

                    delete poItem.grn_items;
                }
            });

            return res.status(200).send({
                code: 200,
                message: "Get Data Successfully",
                data: modifiedData
            });
        } else {
            return res.status(404).send({
                code: 404,
                message: "Record Not Found"
            });
        }
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: error.message || "Server Error"
        });
    }
};

exports.createdata_grn = async (req, res) => {
    try {
        const { batchType, batchNo, expiryDate, item, receiveQty, rejectQty, Item_Id, po_item_id } = req.body;
        if (batchType === "Batch Only") {
            const createdata = await db.grnItem.create({
                po_item_id: po_item_id,
                receiveQty,
                rejectQty,
                Item_Id,
            })
            const createdGRN = await db.grnItemStatus.create({
                grn_Item_Id: createdata.id,
                batchType,
                batchNo,
                expiryDate,
                po_item_id
            })
            if (createdGRN) {
                return res.status(200).json({ code: 200, message: "GRN Status Data Created Successfully" });
            } else {
                return res.status(500).json({ code: 500, message: "Failed to create GRN" });
            }
        } else {
            const createData = await db.grnItem.create({
                po_item_id: item[0].po_item_id,
                receiveQty,
                rejectQty,
                Item_Id: item[0].Item_Id
            })
            const promises = item.map(async (singleItem) => {
                const { itemSerialNo, itemStatus, Item_Id, po_item_id, Item_name } = singleItem;
                const createdGRNItem = await db.grnItemStatus.create({
                    batchType,
                    batchNo,
                    expiryDate,
                    itemSerialNo,
                    itemStatus,
                    Item_Id: Item_Id,
                    po_item_id: po_item_id,
                    Item_name,
                    grn_Item_Id: createData.id,
                });
                return createdGRNItem;
            });
            await Promise.all(promises);
            return res.status(200).json({ code: 200, message: "GRN Status Data Created Successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, message: error.message || "Internal Server Error" });
    }
}

exports.createCode = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                code: 400,
                message: "ID parameter is missing"
            });
        }

        const existingQuality = await db.procurement_po_items.findOne({ where: { po_item_id: id, status: "ACTIVE" } });
        if (!existingQuality) {
            return res.status(404).send({
                code: 404,
                message: "GRN not found with the given ID"
            });
        }

        let generatedCode = "";
        const latestBatch = await db.grnItemStatus.max('batchNo');
        if (latestBatch) {
            generatedCode = "BN" + (parseInt(latestBatch.substring(2)) + 1).toString().padStart(4, '0');
        } else {
            generatedCode = "BN0001";
        }

        const data = await db.grnItemStatus.create({
            batchNo: generatedCode,
            po_item_id: existingQuality.po_item_id
        });

        if (data) {
            return res.status(200).send({
                code: 200,
                message: "Code generated successfully!",
                data: data
            });
        } else {
            return res.status(404).send({
                code: 404,
                message: "Code generated not created!"
            });
        }

    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: error.message
        });
    }
};

exports.get_by_Id_grn = async (req, res) => {
    try {
        const GrnPurchase = await db.grnPurchase.findAll({
            where: { isDeleted: false },
            include: [
                {
                    model: db.grnItem,
                    attributes: ["id", "receiveQty", "rejectQty", "grn_Id", "Item_Id"],
                    include: [
                        {
                            model: db.ItemMaster,
                        },
                    ]
                },
                {
                    model: db.procurement_po_details,
                },
            ],
            order: [['id', 'DESC']],
        });
        if (GrnPurchase && GrnPurchase.length > 0) {
            return res.status(200).send({ code: 200, message: "Get All Item data successfully", data: GrnPurchase });
        } else {
            return res.status(404).send({ code: 404, message: "No Item found" });
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};

exports.updateData_GRN = async (req, res) => {
    try {
        const { id } = req.params;
        const { batchType, batchNo, expiryDate, po_item_id,item} = req.body;
        if (!id) {
            return res.status(400).json({ code: 400, message: "GRN Status ID is required for update" });
        }
        const existingGRNStatus = await db.grnItem.findOne({ where: { id: id } });
        const dataExist = await db.grnItemStatus.findOne({where:{grn_Item_Id: existingGRNStatus.id}})
        if (!existingGRNStatus) {
            return res.status(404).json({ code: 404, message: "GRN Status Data not found" });
        }
        if (dataExist.batchType === "Batch Only") {
          
            await db.grnItemStatus.destroy({ where: { grn_Item_Id: existingGRNStatus.id } });
          
            await db.grnItemStatus.create({
                batchType,
                batchNo,
                expiryDate,
                po_item_id,
                grn_Item_Id:existingGRNStatus.id
            });

            return res.status(200).json({ code: 200, message: "GRN Status Data Updated Successfully" });
        } else {
          
            await db.grnItemStatus.destroy({ where: { grn_Item_Id: id } });
            await Promise.all(item.map(async(item)=>{
                const { itemSerialNo,itemStatus,Item_Id,po_item_id,Item_name} = item
                await db.grnItemStatus.create({
                            grn_Item_Id: id,
                             batchType,
                            batchNo,
                           expiryDate,
                            itemSerialNo,
                            itemStatus,
                            Item_Id,
                            po_item_id,
                            Item_name,
                            grn_Item_Id:existingGRNStatus.id
                        });
            }))
            return res.status(200).json({ code: 200, message: "GRN Status Data Updated Successfully" });
        }
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message || "Internal Server Error" });
    }
}; 

exports.get_all_grnItem_id = async (req, res) => {
    try {
        const { po_item_id } = req.params;
        let whereCondition = {
            isDeleted: false
        };
        if (po_item_id) {
            whereCondition = {
                ...whereCondition,
                po_item_id: po_item_id
            };
        }
        const getData = await db.procurement_po_items.findAll({
            attributes: ['po_item_id'],
            where: whereCondition,
            include:
            {
                model: db.grnItem,
                attributes: [['id', 'grn_item_id'], 'receiveQty', 'rejectQty', 'status'],
                include: [
                    {
                        model: db.grnItemStatus
                    }
                ]
            }
        });
        if (getData.length > 0) {
            return res.status(200).send({ code: 200, message: "Get Data Successfully", data: getData[0] });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};














