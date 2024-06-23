const { sequelize, Sequelize } = require("../../../models");

module.exports=(sequelize,Sequelize)=>{
    const amc_notification = sequelize.define("amc_notification",{
        amc_notification_id:{
            type:Sequelize.INTEGER
        },
        notification_message:{
            type:Sequelize.STRING
        },
        employee_id:{
            type:Sequelize.INTEGER
        },
        status:{
            type:Sequelize.ENUM("ACTIVE","INACTIVE"),
            defaultValue:"ACTIVE"

        }
    })
    return amc_notification;
}