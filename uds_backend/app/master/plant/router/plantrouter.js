const PlantDetails = require('../controllers/plantcontroller');

module.exports = app => {
    app.post("/api/v1/create_plant", PlantDetails.create_plant);
    app.get("/api/v1/plant_getAll/:id?", PlantDetails.plant_getAll);
    app.put("/api/v1/update_plant/:id", PlantDetails.update_plant);
    app.delete("/api/v1/delete_plant/:id", PlantDetails.delete_plant);
    app.put("/api/v1/plantStatus/:id", PlantDetails.plantStatus);
}