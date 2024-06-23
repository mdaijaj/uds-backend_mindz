module.exports = (sequelize, Sequelize) => {
    const empBankDetail = sequelize.define("emp_bank_details", {

        bank_id :{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        empbank_id:{
            type: Sequelize.INTEGER,
        },
      
         bank_name:{
                type: Sequelize.STRING,
                
            } ,
            emp_name_in_bank:{
                type: Sequelize.STRING,
                
            } ,
            branch_address:{
                type: Sequelize.STRING,
                
                
            } ,
            account_number:{
                type: Sequelize.STRING,
                
            } ,
            ifsc_code:{
                type: Sequelize.STRING,
                
                
            } ,
            pf_number:{
                type: Sequelize.STRING,
            
                
            } ,
            uan_number:{
                type: Sequelize.STRING,
                
                
            } ,
            employee_id:{
                type: Sequelize.INTEGER,
                
               
                
             },
                status: {
                type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
                defaultValue: "ACTIVE",
              },

     }
     
    )
    return empBankDetail
}
   