module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("vendor_product_details", {
        vendor_product_details_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        procurement_product_id: {
            type: Sequelize.INTEGER
        },
        product_image: {
            type: Sequelize.STRING
        },
        item_name: {
            type: Sequelize.STRING
        },
        item_code: {
            type: Sequelize.INTEGER
        },
        unit: {
            type: Sequelize.INTEGER
        },
        priority: {
            type: Sequelize.ENUM("HIGH", "MEDIUM", "LOW")
        },
        mvp: {
            type: Sequelize.INTEGER
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
        name: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        emp_id: {
            type: Sequelize.INTEGER
        },
        approvel_status: {
            type: Sequelize.ENUM("APPROVED", "PENDING", "REJECTED", "TO BE APPROVED"),
            defaultValue: "PENDING"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        end_date: {
            type: Sequelize.STRING
        },
        vendors: {
            type: Sequelize.INTEGER
        },
        rfp_status: {
            type: Sequelize.ENUM("LIVE RFP", "CLOSE RFP"),
        },
        price_amt: {
            type: Sequelize.INTEGER
        },
        sgst: {
            type: Sequelize.INTEGER
        },
        cgst: {
            type: Sequelize.INTEGER
        },
        igst: {
            type: Sequelize.INTEGER
        },
        delivery_charges: {
            type: Sequelize.INTEGER
        },
        additional_charges: {
            type: Sequelize.INTEGER
        },
        currency: {
            type: Sequelize.STRING
        },
        vendor_remarks: {
            type: Sequelize.STRING
        },
        vendor_uploaded_document: {
            type: Sequelize.STRING
        },
        remarks_approvel: {
            type: Sequelize.STRING
        },
        approvel_vendor: {
            type: Sequelize.ENUM("APPROVED", "APPROVED COST", "REJECTED")
        },
        final_remarks: {
            type: Sequelize.STRING
        },
        checked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        is_disabled: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        updateValue: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        Rfp_Number: {
            type: Sequelize.STRING
        },
        procurement_type:{
            type: Sequelize.STRING
        },
        vendor_responded: {
            type: Sequelize.ENUM("TRUE", "FALSE"),
            defaultValue: "FALSE"
        },
        stop_Rfp_date:{
            type: Sequelize.STRING
        }

    });
    return procurement
}