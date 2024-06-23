module.exports = (sequelize, Sequelize) => {
    const grnItemStatus = sequelize.define("grn_item_status", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        batchType: {
            type: Sequelize.STRING
        },
        batchNo: {
            type: Sequelize.STRING
        },
        expiryDate: {
            type: Sequelize.DATEONLY
        },
        itemSerialNo: {
            type: Sequelize.STRING
        },
        Item_name: {
            type: Sequelize.STRING
        },
        itemStatus: {
            type: Sequelize.ENUM("SELECTED", "REJECTED","PENDING"),
            defaultValue: "PENDING"
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

    return grnItemStatus;
};