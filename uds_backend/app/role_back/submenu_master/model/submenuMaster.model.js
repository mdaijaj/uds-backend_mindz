module.exports = (sequelize, Sequelize) => {
    const submenuMasterDetails = sequelize.define("submenu_master", {
        submenu_master_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        submenu_master_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        submenu_masters_link:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        submenu_masters_icon:{
          type:Sequelize.STRING,
          allowNull:true,
          defaultValue:'fa fa-chevron-down',
        },
        menu_master_id: {
            type: Sequelize.INTEGER,
            references: {
            model: 'menu_masters',
            key: 'menu_master_id',
        }},
        role_module_master_id: {
            type: Sequelize.INTEGER,
            references: {
            model: 'role_module_masters',
            key: 'role_module_master_id',
            }
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
        submenu_completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            // allowNull :true
          },
          module_assigned:{
            type: Sequelize.STRING
          }   
    });
    return submenuMasterDetails;
};