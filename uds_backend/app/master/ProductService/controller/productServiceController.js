const db = require("../../../models/index");


module.exports.createProductService = async (req, res) => {
    try {
        const { service_name,service_code,service_description,itemNameList}    = req.body;
        const oldData = await db.models.productService.findOne({ where: { service_name: service_name , isDeleted : false } });
        if (oldData) {
            return res.status(201).send({ code:201, message: "Service Name Already Exists!" });
        }
        const oldData2 = await db.models.productService.findAll({ where: { service_code: service_code } });
        if (oldData2[0]) {
            if (oldData2.some(productService => !productService.isDeleted)) {
                return res.status(201).send({ code:201, message: "Service Code Already Exists!" });
            } 
        }
        
        const createData = await db.models.productService.create({
            service_name,service_code,service_description
        })
        const Obj = await Promise.all(itemNameList.map(async (asset) => {
            const { asset_id, itemList } = asset;
            await Promise.all(itemList.map(async (item) => {
                const { item_id } = item;
                await db.models.productAssetItem.create({
                    item_id: item_id,
                    asset_category_id: asset_id,
                    product_service_id:createData.id
                });
            }));
        }));
       if(Obj){
        return res.status(201).json({code: 201, message: "Item Created Successfully"})  
       }else{
        return res.status(404).json({code: 404, message: "Not Created Successfully"}) 
       }
    } catch (error) {
        return res.status(500).send({ code: 500, message:error.message || "Server Error" });
    };
};

module.exports.allProductService= async(req,res)=>{
    try {
        const allData= await db.sequelize.query(
            `SELECT DISTINCT PS.id, PS.service_name,PS.service_code,PS.service_description,PS.status FROM SYS_PRODUCT_SERVICE_MST AS PS
            INNER JOIN SYS_PRODUCT_ASSET_ITEM_MST AS PA ON PA.product_service_id= PS.id
             ORDER BY PS.id DESC`
        )
        if(allData){
            return res.status(201).json({code: 201, message: " Success",data:allData[0]})  
           }else{
            return res.status(404).json({code: 404, message: "Not Found"}) 
           }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

module.exports.allActiveProductService= async(req,res)=>{
    try {
        const allData= await db.sequelize.query(
            `SELECT DISTINCT PS.id, PS.service_name,PS.service_code,PS.service_description,PS.status FROM SYS_PRODUCT_SERVICE_MST AS PS
            INNER JOIN SYS_PRODUCT_ASSET_ITEM_MST AS PA ON PA.product_service_id= PS.id
            WHERE PS.status = true 
             ORDER BY PS.id DESC`
        )
        if(allData){
            return res.status(201).json({code: 201, message: " Success",data:allData[0]})  
           }else{
            return res.status(404).json({code: 404, message: "Not Found"}) 
           }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

module.exports.allProductServiceById = async (req,res)=>{
    try {
        const {id}= req.params;
        const data = await db.models.productService.findOne({
            attributes:["id","service_name","service_code","service_description","status"],
            where:{id}
        });
        const allData= await db.sequelize.query(
            `SELECT IM.item_name,P.item_id,A.asset_category_name,P.asset_category_id AS asset_id FROM SYS_PRODUCT_ASSET_ITEM_MST AS P 
            INNER JOIN ItemMasters AS IM ON P.item_id= IM.id
            INNER JOIN asset_category AS A ON A.id= P.asset_category_id
            INNER JOIN SYS_PRODUCT_SERVICE_MST AS PS ON PS.id= P.product_service_id
            WHERE PS.id = ${id}`
        )
        if (data) {
            const responseObj = {
               ...data.dataValues,
                "itemNameList": allData[0].reduce((acc, item) => {
                    const existingCategory = acc.find(category => category.asset_id === item.asset_id);
                    const newItem = { item_id: item.item_id, item_name: item.item_name };
                    if (existingCategory) {
                        existingCategory.itemList.push(newItem);
                    } else {
                        acc.push({
                            asset_id:item.asset_id, 
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
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

module.exports.updateProductServiceById = async (req,res) =>{
    try {
        const {id} = req.params;
        const { service_name,service_code,service_description,itemNameList}    = req.body;
        const dataExist = await db.models.productService.findOne({where:{id}})
        const createData = await db.models.productService.update({
            service_name,service_code,service_description
        },{where:{id}})
        if(itemNameList){
          await db.models.productAssetItem.destroy({where:{product_service_id:dataExist.id}})
            const Obj = await Promise.all(itemNameList.map(async (asset) => {
                const { asset_id, itemList } = asset;
                await Promise.all(itemList.map(async (item) => {
                    const { item_id } = item;
                    await db.models.productAssetItem.create({
                        item_id: item_id,
                        asset_category_id: asset_id,
                        product_service_id:dataExist.id
                    });
                }));
            }));
        }
        
       if(createData){
        return res.status(201).json({code: 201, message: "updated Successfully"})  
       }else{
        return res.status(404).json({code: 404, message: "Not Updated"}) 
       }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

module.exports.deleteProductionServiceById= async(req,res)=>{
    try {
        const {id} = req.params;
        const dataExist = await db.models.productService.findOne({where:{id}})
        if(!dataExist){
            return res.status(409).send({ code:409,message: " production service not found" });
        }
        const dataValue = await db.models.productService.update({status:false},{where:{id:dataExist.id}});
        if(dataValue){
            return res.status(200).json({code: 200, message: "Deleted Successfully"})  
        }else{
            return res.status(404).json({code: 404, message: "Not Deleted"}) 
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }

}

exports.productServiceStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        if (status === undefined) {
            return res.status(400).send({
                code: 400,
                message: "Bad Request: 'status' property is missing in the request body",
            });
        }
        console.log(status);
        const getData = await db.models.productService.findOne({
            where: {
                id: id,
            },
        });
        if (getData) {
            await db.models.productService.update(
                {
                    status,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return res.status(200).send({
                code: 200,
                message: "Product Status Change Successfully!",
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};