const db = require("../../../models/index");
const level_slabDetails = db.level_slab;
const op = db.sequelize.op;

exports.createlevel_slab = async (req, res) => {
    try {
        const { level_slab_name } = req.body;
        const level_slab = await level_slabDetails.findOne({ where: { level_slab_name: level_slab_name, isDeleted:false } });
        if (level_slab) {
            return res.status(201).send({ code: 201, message: "level_slab Name is Already Exits!" });
        }
        const response = await level_slabDetails.create({
            level_slab_name
        });
        return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAlllevel_slab = async (req, res) => {
    try {
        const getAllData = await level_slabDetails.findAll({
            where: { isDeleted: false }, order: [['level_slab_id', 'DESC']]
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetById level_slab ///////////////

exports.getByIdlevel_slab = async (req, res) => {
    try {
        const level_slabId = parseInt(req.params.level_slab_id);
        const getData = await level_slabDetails.findOne({ where: { level_slab_id: level_slabId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////Update Status ///////////////////////////
exports.updatelevel_slabStatus = async (req, res) => {
    try {
        const level_slabId = req.params.level_slab_id;
        const { status } = req.body;
        const editData = await level_slabDetails.findOne({ where: { level_slab_id: level_slabId } });
        if (editData) {
            const updateData = await level_slabDetails.update(
                {
                    status
                }, { where: { level_slab_id: level_slabId } }
            );
            return res.status(200).send({ code: 200, message: "Status Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Delete level_slab ///////////////

exports.deletelevel_slab = async (req, res) => {
    try {
        const level_slabId = parseInt(req.params.level_slab_id);
        const dltlevel_slab = await level_slabDetails.findOne({ where: { level_slab_id: level_slabId } });
        if (dltlevel_slab) {
            const deleteData = await level_slabDetails.update({ isDeleted: true }, { where: { level_slab_id: level_slabId } });
            return res.status(200).send({ code: 200, message: "level_slab Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.editlevel_slab = async (req, res) => {
    try {
        const level_slab_ID = parseInt(req.params.level_slab_id);
        const { level_slab_name } = req.body;
        const dltlevel_slab = await level_slabDetails.findOne({ where: { level_slab_id: level_slab_ID } });
        if (dltlevel_slab) {
            const level_slab_namee = await level_slabDetails.findAll({ where: { level_slab_name: level_slab_name } });
            if (level_slab_namee[0]) {
                return res.status(409).send({ code: 409, message: "level_slab Name is Already Exits!" });
            } else {
                const EDITData = await level_slabDetails.update(req.body, { where: { level_slab_id: level_slab_ID } });
                return res.status(200).send({ code: 200, message: "Data is Update Successfully!", data: EDITData });
            }
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};