const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const allocation = sequelize.define(
    "ASSET_MANAGEMENT_ALLOCATION",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      allocation_type: {
        type: Sequelize.ENUM('Location', 'Employee'),
      },
      remark: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN(true, false),
        defaultValue: false,
      },

      // Foreign key start
      // item_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'itemmasters',
      //     key: 'id',
      //   },
      // },
      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbl_branch',
          key: 'id',
        },
      },
      role_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'role_masters',
          key: 'role_master_id',
        },
      },
      employee_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'registered_users',
          key: 'employee_id',
        },
      }
      // Foreign key end
    },
    {
      freezeTableName: true,
    }
  );

  allocation.associate = function (models) {
    // allocation.hasMany(models.itemmasters, { foreignKey: 'item_id' });
    allocation.hasMany(models.tbl_branch, { foreignKey: 'branch_id' });
    allocation.hasMany(models.role_masters, { foreignKey: 'role_id' });
    allocation.hasMany(models.registered_users, { foreignKey: 'employee_id' });
  };
  return allocation;
};