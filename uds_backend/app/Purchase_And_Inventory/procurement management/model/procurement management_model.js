module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("procurement_purchase_request", {
        procurement_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        department: {
            type: Sequelize.STRING
        },
        financial_year: {
            type: Sequelize.STRING
        },
        PR_code: {
            type: Sequelize.STRING
        },
        PR_category: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        pin: {
            type: Sequelize.INTEGER
        },
        delivery_address: {
            type: Sequelize.STRING
        },
        file: {
            type: Sequelize.STRING
        },
        remarks: {
            type: Sequelize.STRING
        },
        total_mvp: {
            type: Sequelize.INTEGER
        },
        approvel_status: {
            type: Sequelize.ENUM("APPROVED","PENDING", "REJECTED"),
            defaultValue: "PENDING"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }, 
        po_status: {
            type: Sequelize.ENUM("PAID", "UNPAID"),
            defaultValue: "PAID"
        }, 
        PR_type: {
            type:Sequelize.ENUM("Capex", "Opex"),
            defaultValue: null
        },
    });
    return procurement
}