module.exports = (sequelize, Sequelize) => {
    const menuMasterDetails = sequelize.define("menu_master", {
        menu_master_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        menu_master_link:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        menu_masters_icon:{
          type:Sequelize.STRING,
          allowNull:true,
          defaultValue:'fa fa-chevron-down',
        },
        menu_master_lastIcon:{
            type:Sequelize.STRING,
            allowNull:true,
            defaultValue:'fa fa-chevron-down',
          },
        menu_master_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        menu_title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role_module_master_id: {
            type: Sequelize.INTEGER,
            references: {
            model: 'role_module_masters',
            key: 'role_module_master_id',
        },
       
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
        menu_completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            // allowNull :true
          },          
 
    });
    return menuMasterDetails;
};