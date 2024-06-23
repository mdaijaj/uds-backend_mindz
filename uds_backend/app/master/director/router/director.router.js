const directorController = require("../controller/director.controller");


module.exports = app => {
    app.post("/api/v1/create_director", directorController.create_director );
    app.put("/api/v1/edit_director/:id", directorController.edit_director);
    app.get("/api/v1/get_ById_director/:id", directorController.get_ById_director);
    app.get("/api/v1/getAll_director", directorController.getAll_director);
    app.delete("/api/v1/delete_director/:id", directorController.delete_director)
}