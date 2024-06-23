const Salary_Controller=require('../Controller/Sal_Structure_Controller')



module.exports = app => {
    app.post('/api/v1/Get_Salary_Structure',Salary_Controller.Create_Salary_Structure)
}