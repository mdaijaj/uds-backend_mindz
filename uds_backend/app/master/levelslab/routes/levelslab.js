module.exports = app => {
    const level_slabController = require("../controller/leveslab.js");
 
    app.post("/api/v1/create_level_slab", level_slabController.createlevel_slab);
    app.get("/api/v1/getAll_level_slab", level_slabController.getAlllevel_slab);
    app.get("/api/v1/get_ById_level_slab/:level_slab_id", level_slabController.getByIdlevel_slab);
    app.delete("/api/v1/delete_level_slab/:level_slab_id", level_slabController.deletelevel_slab);
    app.put("/api/v1/edit_level_slab/:level_slab_id", level_slabController.editlevel_slab);
    app.put("/api/v1/update_level_slab_Status/:level_slab_id", level_slabController.updatelevel_slabStatus);
}