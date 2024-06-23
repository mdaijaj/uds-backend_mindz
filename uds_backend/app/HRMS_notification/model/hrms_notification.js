module.exports = (sequelize, Sequelize) => {
    const hrms_notification_data = sequelize.define("HRMS_notification", {
       hrms_notification_id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
       },
       notification_message:{
        type:Sequelize.STRING
       },
       assigned_hiring_manager_id:{
        type:Sequelize.INTEGER
       },
       status:{
        type:Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue:"ACTIVE"
       }
    });
    return hrms_notification_data;
}

