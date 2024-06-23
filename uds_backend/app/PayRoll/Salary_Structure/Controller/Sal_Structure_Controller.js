const db = require("../../../models/index");
const componentTypeDetails = db.componentTypeDetail;
const userDetials = db.user

exports.Create_Salary_Structure = async (req, res) => {
    try {
        const employeeData = await userDetials.findAll({
            attributes: ["employee_id", "first_name", "last_name", "tatal_ctc", "fixed_ctc", "variable_ctc"]
        });
        const componentData = await componentTypeDetails.findAll({
            attributes: ['component_type_id', 'component_name', 'component_code', 'record_add_By', 'formula', 'Formula_status', 'component_status', 'status']
        })
       for(let i=0;i<employeeData.length;i++){
        for(let j=0;j<componentData.length;j++){
            const obj={
                "employee_id":employeeData[i].employee_id, 
                "first_name":employeeData[i].first_name, 
                "last_name":employeeData[i].last_name, 
                "tatal_ctc":employeeData[i].tatal_ctc, 
                "fixed_ctc":employeeData[i].fixed_ctc, 
                "variable_ctc":employeeData[i].variable_ctc,
                "reporting_manager":employeeData[i].reporting_manager,
                "reporting_manager_id":employeeData[i].reporting_manager_id
            }
            // const 
        }
       }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Server error" })
    }
}

// exports.Create_Salary_Structure=async(req,res)=>{
//     try{
//         const {
//             employee_id,
//             first_name,
//             last_name,
//             tatal_ctc,
//             fixed_ctc,
//             variable_ctc,
//             component_type_id,
//             component_name,
//             component_code,
//             record_add_By,
//             formula,
//             Formula_status,
//             component_status,
//             status,
//             value}=req.body;
//         const Create_data=await Salary.create({
//             employee_id,
//             first_name,
//             last_name,
//             tatal_ctc,
//             fixed_ctc,
//             variable_ctc,
//             component_type_id,
//             component_name,
//             component_code,
//             record_add_By,
//             formula,
//             Formula_status,
//             component_status,
//             status,
//             value
//         })
//         res.status(200).send({code:200,message:"Success",code:Create_data})
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).send({code:500,message:"Server Error"})
//     }
// }