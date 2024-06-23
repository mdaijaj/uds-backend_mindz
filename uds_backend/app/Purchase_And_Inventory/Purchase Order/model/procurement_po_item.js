module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("po_item_detail", {
        po_item_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        department: {
            type: Sequelize.STRING
        },
        po_category_type: {
            type: Sequelize.STRING
        },
        item_quantity: {
            type: Sequelize.INTEGER
        },
        unit_price: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.INTEGER
        },
        tax: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        po_status: {
            type: Sequelize.ENUM("DRAFT PO", "ISSUED PO", "ISSUED INVOICE","PAID"),
            defaultValue: "PAID"
        },
        statusVendor: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },    
    });
    return procurement
}