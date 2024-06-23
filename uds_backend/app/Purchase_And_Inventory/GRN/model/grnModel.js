module.exports = (sequelize, Sequelize) => {
    const grnPurchase = sequelize.define("grn_master", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        invoiceNo: {
            type: Sequelize.INTEGER
        },
        invoiceDate: {
            type: Sequelize.DATEONLY
        },
        invoiceDoc: {
            type: Sequelize.STRING
        },
        grnStatus: {
            type: Sequelize.ENUM("PARTIAL", "COMPLETE","PENDING"),
            defaultValue:"PENDING"
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
    return grnPurchase;
};