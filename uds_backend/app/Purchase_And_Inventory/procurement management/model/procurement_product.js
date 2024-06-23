module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("procurement_item_request", {
        procurement_product_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        department: {
            type: Sequelize.STRING
        },
        PR_category: {
            type: Sequelize.STRING
        },
        item_quantity: {
            type: Sequelize.INTEGER
        },
        priority: {
            type: Sequelize.ENUM("HIGH", "MEDIUM", "LOW")
        },
        mvp: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        end_date: {
            type: Sequelize.STRING
        },
        vendors: {
            type: Sequelize.JSON
        },
        vendors_invited_count: {
            type: Sequelize.INTEGER
        },
        vendors_responded_count: {
            type: Sequelize.INTEGER
        },
        invoice_n_o: {
            type: Sequelize.INTEGER
        },
        invoice_date: {
            type: Sequelize.STRING
        },
        invoice_remarks: {
            type: Sequelize.STRING
        },
        invoice_file: {
            type: Sequelize.STRING
        },
        grn_date: {
            type: Sequelize.STRING
        },
        grn_item_n_o: {
            type: Sequelize.INTEGER
        },
        grn_location: {
            type: Sequelize.STRING
        },
        grn_file: {
            type: Sequelize.STRING
        },
        rfp_status: {
            type: Sequelize.ENUM("LIVE RFP", "CLOSE RFP"),
        },
        po_status: {
            type: Sequelize.ENUM("DRAFT PO", "ISSUED PO", "ISSUED INVOICE","PAID"),
            defaultValue: "PAID"
        },
        statusVendor: {
            type: Sequelize.STRING
        }
    });
    return procurement
}