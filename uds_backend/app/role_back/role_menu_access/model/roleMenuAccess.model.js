module.exports = (sequelize, Sequelize) => {
    const roleMenuAccessDetails = sequelize.define("role_menu_access", {
        role_menu_access_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_master_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'role_masters',
                key: 'role_master_id',
            },
        },
        employee_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'registered_users',
                key: 'employee_id',
            },
        },
        role_module_master_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'role_module_masters',
                key: 'role_module_master_id',
            },
        },
        role_module_master_completed: {
            type: Sequelize.BOOLEAN(true, false),
        },
        menu_master_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'menu_masters',
                key: 'menu_master_id',
            },
        },
        menu_completed: {
            type: Sequelize.BOOLEAN(true, false),
        },
        submenu_master_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'submenu_masters',
                key: 'submenu_master_id',
            },
        },
        submenu_completed: {
            type: Sequelize.BOOLEAN(true, false),
        },
        read_module_access: {
            type: Sequelize.BOOLEAN(true, false),
        },
        write_module_access: {
            type: Sequelize.BOOLEAN(true, false),
        },
        delete_module_access: {
            type: Sequelize.BOOLEAN(true, false),
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull: true
        },

    });
    return roleMenuAccessDetails;
};