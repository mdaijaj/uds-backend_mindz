const l1ReviewController = require("../controller/L1Review.controller");


module.exports = app => {
    app.post("/api/v1/create_l1Review", l1ReviewController.create_l1Review);
    app.get("/api/v1/getAll_l1Review", l1ReviewController.getAll_l1Review);
    app.get("/api/v1/getById_l1Review/:id", l1ReviewController.getById_l1Review);
    app.put("/api/v1/edit_l1Review/:id", l1ReviewController.edit_l1Review);
    app.delete("/api/v1/delete_l1Review/:id", l1ReviewController.delete_l1Review);

}