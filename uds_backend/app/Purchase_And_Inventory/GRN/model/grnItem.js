module.exports = (sequelize, Sequelize) => {
    const grnItem = sequelize.define("grn_items", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        receiveQty: {
            type: Sequelize.INTEGER
        },
        rejectQty: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, {
        freezeTableName: true
    });

    return grnItem;
};