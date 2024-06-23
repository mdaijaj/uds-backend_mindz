module.exports = (sequelize, Sequelize) => {
    const notification_sales_request = sequelize.define("notification_sales_request", {
        notification_sales_request_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        lead_genration_id:{
            type:Sequelize.INTEGER,
        },
        role_master_id:{
            type:Sequelize.INTEGER,
        },
        br_number:{
            type:Sequelize.JSON,
        },
      
      
        message:{
            type:Sequelize.STRING,
        },

    
    });
    return notification_sales_request;
}