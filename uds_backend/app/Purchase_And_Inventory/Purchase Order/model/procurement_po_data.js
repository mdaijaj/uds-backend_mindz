module.exports = (sequelize, Sequelize) => {
    const procurement_po_details = sequelize.define("procurement_po_details", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        delivery_branch: {
            type: Sequelize.STRING
        },
        department_name: {
            type: Sequelize.STRING
        },
        po_type: {
            type: Sequelize.STRING
        },
        po_supplier_vendor_name: {
            type: Sequelize.STRING
        },
        po_date: {
            type: Sequelize.DATEONLY
        },
        po_number: {
            type: Sequelize.STRING
        },
        po_category_type: {
            type: Sequelize.STRING
        },
        financial_year: {
            type: Sequelize.STRING
        },
        po_attached_doc: {
            type: Sequelize.STRING
        },
        po_remark: {
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.INTEGER,
        },
        procurement_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        approvel_status: {
            type: Sequelize.ENUM("APPROVED","PENDING", "REJECTED", "PUSH BACK"),
            defaultValue: "PENDING"
        },
        po_status: {
            type: Sequelize.ENUM("PAID", "UNPAID"),
            defaultValue: "PAID"
        }, 
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }, 
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },      
    },
    {
        freezeTableName:true
    }
    );
    return procurement_po_details
}