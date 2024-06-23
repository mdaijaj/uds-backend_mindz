const db = require("../../../models/index");

module.exports.createWarehouse = async (req, res) => {
    try {
        const { name, plant_id, role_id, employee_id, contact_no, email, alt_email } = req.body;
        const createdWarehouse = await db.warehouse.create(
            {
                name,
                plant_id,
                role_id,
                employee_id,
                contact_no,
                email,
                alt_email
            });
        if (createdWarehouse) {
            return res.status(201).send({ code: 201, message: "Successfully created" });
        } else {
            return res.status(404).send({ code: 404, message: "Data not found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};

module.exports.getWarehouseList = async(req, res, next) => {
    try {
        let warehouseList = await db.warehouse.findAll();

        //add plant name from plant table
        for ( let i = 0 ; i < warehouseList.length ; i++) {
            const plant  = await db.plantmaster.findOne({ where: { id: warehouseList[i].plant_id } });
            let temp = {
                "id": warehouseList[i].id,
                "name": warehouseList[i].name,
                "contact_no": warehouseList[i].contact_no,
                "email": warehouseList[i].email,
                "alt_email": warehouseList[i].alt_email,
                "createdAt": warehouseList[i].createdAt,
                "updatedAt": warehouseList[i].updatedAt,
                "employee_id":warehouseList[i].employee_id,
                "role_id": warehouseList[i].role_id,
                "plant_id": warehouseList[i].plant_id
            }
            warehouseList[i] = temp;
            if ( plant && plant.dataValues && plant.dataValues.plant_name ){
                warehouseList[i].plant_name = plant.dataValues.plant_name
            }else{
                warehouseList[i].plant_name = ""
            }
        }
        if(warehouseList.length > 0) {
            return res.status(200).json({code: 200,message: "Success ",data: warehouseList});
        }else{
            return res.status(404).json({ code : 404, message : "warehouse list not found" , data: warehouseList});
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.getWarehouseById = async(req, res, next) => {
    try {
        const warehouse = await db.warehouse.findOne({ where: { id : req.params.id }});
        if(warehouse) {
            return res.status(200).json({code: 200,message: "Success ",data: warehouse});
        }else{
            return res.status(404).json({ code : 404, message : "warehouse not found" , data: warehouse});
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.editWarehouse = async (req, res) => {
    try {
        const { id, name, plant_id, role_id, employee_id, contact_no, email, alt_email } = req.body;
        const editData = await db.warehouse.findOne({ where: { id: id } });
        if (editData) {
                        const updateData = await db.warehouse.update(
                            {
                                id,
                                name,
                                plant_id, 
                                role_id, 
                                employee_id, 
                                contact_no, 
                                email, 
                                alt_email 
                            },
                            { where: { id: id } }
                        );
      
            return res.status(200).send({ code: 200, message: "Warehouse Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "warehouse Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};

module.exports.getWarehouseByPlant = async (req, res) => {
    try {
        const { plantId } = req.params.plantId;
        const dataList = await db.warehouse.findAll({ where: { plant_id: req.params.plantId } });
        if (dataList.length > 0 ){
            return res.status(200).json({code: 200,message: "Success ",data: dataList});
        }else if (dataList.length == 0 ){
            return res.status(200).json({code: 200,message: "Success ",data: []});
        } else {
            return res.status(404).send({ code: 404, message: "warehouse Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
};