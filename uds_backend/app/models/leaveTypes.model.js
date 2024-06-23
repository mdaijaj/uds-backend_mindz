module.exports = (sequelize, Sequelize) => {
    const leaveTypesDetails = sequelize.define("leaveMater", {
        leave_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        leave_type: {
            type: Sequelize.STRING
        },
        number_of_leave: {
            type: Sequelize.INTEGER
        },
        is_carry_forward: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        leave_in_month: {
            type: Sequelize.FLOAT
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
        },
    });
    return leaveTypesDetails;
};