const db = require("../../models/index");
const employees_salary=db.employee_salary
const { Op } = require("sequelize");
const User=db.user
const salaryStructureDetail = db.employee_salary;
const leaveApplyDetails = db.leaveApplyDetail;
const componentTypeDetails = db.componentTypeDetail;
const bonusDetails = db.bonusDetail
exports.salary_break_down=async(req,res)=>{
    try{
         const employee_id=req.params.id
         const employee_Salary_beakup=req.body.salary_Arr
         const emp_salary=await employees_salary.findOne({wereh:{employee_id:employee_id}})
         if(emp_salary){
            const update_emp_salay=await employees_salary.update({component_formula:employee_Salary_beakup},{where:{employee_id:employee_id}})
            return res.status(200).send({code:200,message:"Employee Salary Breakup updated"})
         }       
         else{
            const create_emp_salary=await employees_salary.create({
                employee_id,
                component_formula:employee_Salary_beakup
            })
            return res.status(200).send({code:200,message:"Employee Salary Breakup created!",data:create_emp_salary
        })
         }
    }
    catch(error){
        console.error(error)
    }
}

exports.get_unpaid_leave_data=async(req,res)=>{
    try{
        const Date=req.body.date;
        const all_emp=await User.findAll({where:[]})
        
    }
    catch(error){
        console.error(error)
        return res.status(400).send({code:400,message:"Internal Server Error"})
    }
}

exports.get_employee_salary_component=async(req,res)=>{
    try{
        const Arr=[]
        const employee_id=req.params.id
        const employee_existance=await User.findOne({where:{employee_id:employee_id}})
        if(employee_existance){
        const component_data=await componentTypeDetails.findAll({where:{component_status:"ACTIVE"},
        attributes: ["component_name","component_code","formula"]
    }) 
    for(let i=0; i<component_data.length; i++){
        const obj={
            "employee_id": employee_id,
            "component_name": component_data[i].component_name,
            "component_code": component_data[i].component_code,
            "formula": component_data[i].formula
        }
        Arr.push(obj)
    }
        return res.status(200).send({code:200,message:"Data Fetched",data:Arr})
    }
    else{
        return res.status(404).send({code:404,message:"There is no employee with such id"})
    }
}
    catch(error){
        console.log(error);
        return res.status(400).send({code:400,message:"Internal Server Error"})
    }
}

exports.get_all_employee_salary_monthly=async(req,res)=>{
    try{
        const month_year=req.body.month_year
        const unpaid_leave=await leaveApplyDetails.findAll({where:{
           [Op.and]:[{starting_leave_month:month_year},
                     {ending_leave_month:month_year},
                     {leave_apply_status:"APPROVED"}       
            ] 
        },
    attributes:['extra_leave']
})  
const bonus_data=await bonusDetails.findAll({where:{bonus_date:month_year}})

const employe_Salary_data=await salaryStructureDetail.findAll({where:{employee_salary_status:"ACTIVE"},
    attributes:['employee_id', ]
})
for(let i=0;i<employe_Salary_data.length;i++){
    let employee_data={
        "employee_id":"",
        "employee_name":"",
        "Basic_salary":"",
        "HRA":"",
        "Food_cupouns":"",
        "other_Allowance":"",
        "Leave_Travel Allowance":"",
        "Gross_Earning":"",
        "PF":"",
        "Gratutity":"",
        "Insurance":"",
        "Net Payable":"",
        "Bonus":"",
        "Unpaid_leaves":""
    }
}
        
        return res.status(200).send({code:200,message:"data fetch successful",data:bonus_data})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}