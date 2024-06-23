module.exports = app => {
    const controller = require("../controllers/sbu.controller");
      
    app.post("/api/v1/sbu",controller.createSbu);
    app.get("/api/v1/sbulist", controller.sbuList)
    app.get("/api/v1/sbudetails/:id", controller.sbuDetails)
    app.put("/api/v1/sbuupdate/:id", controller.sbuUpdate)
    app.put("/api/v1/sbudelete/:id", controller.sbuDeleted)
};