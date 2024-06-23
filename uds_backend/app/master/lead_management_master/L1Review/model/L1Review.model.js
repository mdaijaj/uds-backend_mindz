module.exports = (sequelize, Sequelize) => {
    const l1review_Details = sequelize.define("l1review", {
        l1review_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        l1_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        discription: {
            type: Sequelize.STRING,
        },
        code_status: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue:false
        },
        comment: {
            type: Sequelize.STRING,
        },
        sub_menu: {
            type: Sequelize.JSON,
        },
        not_applied: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
         done: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
        },
    });
    return l1review_Details;
};