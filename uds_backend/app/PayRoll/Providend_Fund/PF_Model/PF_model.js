module.exports = (sequelize, Sequelize) => {
    const PF_Data = sequelize.define("Providend_Fund", {
        PF_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Emp_type:{
            type: Sequelize.STRING
          },
          Condition:{
             type:Sequelize.JSON,
          },
          Formula:{
             type:Sequelize.JSON
          },
          start_Date:{
             type:Sequelize.DATEONLY("YYYY-MM-DD")
          },
          End_Date:{
             type:Sequelize.DATEONLY("YYYY-MM-DD")
          },
          employee_id:{
            type:Sequelize.INTEGER
          },
         status:{
             type:Sequelize.ENUM("ACTIVE", "INACTIVE"),
             defaultValue:"ACTIVE"
         }
    });
    return PF_Data;
}
