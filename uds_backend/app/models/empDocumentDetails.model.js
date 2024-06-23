module.exports = (sequelize, Sequelize) => {
    const empDocuments = sequelize.define("emp_document_details", {
        emp_document_id :{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
      employee_id : {
        type: Sequelize.INTEGER,
        references: {
          model: 'registered_users',
          key: 'employee_id',
        },
        allowNull: false,
       
      },
      document_file:{
        type:Sequelize.STRING,
      },
      document_type:{
        type: Sequelize.STRING,
        
      },
      document_name:{
        type: Sequelize.STRING,
      },
      description :{
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
      },

    }
    )
    return empDocuments
}
   
   