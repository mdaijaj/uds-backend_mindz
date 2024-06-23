const employee_salary_route = require("./employee_Salary_controller");


module.exports = app =>{
    app.post("/api/v1/create_Salay_break_down/:id",employee_salary_route.salary_break_down)
    app.get("/api/v1/get_unpaid_leave_data",employee_salary_route.get_unpaid_leave_data)
    app.get("/api/v1/get_employee_salary_components/:id",employee_salary_route.get_employee_salary_component)
    app.post("/api/v1/get_all_employee_monthly_Salary",employee_salary_route.get_all_employee_salary_monthly)
}