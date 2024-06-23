module.exports = app => {
    const role_menu_accessController = require("../controller/roleMenuAccess.controller");
    // app.post("/api/v1/createroleMenuAccess", role_menu_accessController.createroleMenuAccess);
    app.get("/api/v1/getAllroleMenuAccess", role_menu_accessController.getAllroleMenuAccess);
    // app.get("/api/v1/getByIdroleMenuAccess/:role_master_id", role_menu_accessController.getByIdroleMenuAccess);
    app.get("/api/v1/getByIdroleMenuAccess/:employee_id", role_menu_accessController.getByIdroleMenuAccess);

    // app.put("/api/v1/editroleMenuAccess/:role_master_id", role_menu_accessController.editroleMenuAccess);  
    app.put("/api/v1/editroleMenuAccess/:employee_id", role_menu_accessController.editroleMenuAccess); 
    // app.delete("/api/v1/deleteroleMenuAccess/:role_menu_access_id", role_menu_accessController.deleteroleMenuAccess);
    app.get("/api/v1/getroleMenuAccess/:employee_id", role_menu_accessController.getroleMenuAccess);
    app.post("/api/v1/assignaction/:employee_id", role_menu_accessController.crudFactionality)
    app.post("/api/v1/getassignactionfucntion/:employee_id", role_menu_accessController.getRolewise)
    app.post("/api/v1/searchMasterFilter", role_menu_accessController.searchMasterFilter);
}