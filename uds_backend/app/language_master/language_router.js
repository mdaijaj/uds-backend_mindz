const langauge_controller=require("./language_controller")

module.exports = app => {

    app.post("/api/v1/create_new_language",langauge_controller.create_new_language)
    app.get("/api/v1/get_language_byid/:id",langauge_controller.get_language_byid)
    app.get("/api/v1/get_all_languages",langauge_controller.get_all_languages)
    app.put("/api/v1/update_language/:id",langauge_controller.update_language)
    app.put("/api/v1/update_language_status/:id",langauge_controller.update_languageStatus)
    app.delete("/api/v1/delete_language/:id",langauge_controller.delete_language)
}