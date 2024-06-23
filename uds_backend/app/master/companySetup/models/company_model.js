module.exports = (sequelize, Sequelize) => {
    const company = sequelize.define("SYS_COMPANY_MST", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       company_name: {
            type: Sequelize.STRING
        },
        company_country: {
            type: Sequelize.STRING
        },
        company_state: {
            type: Sequelize.STRING
        },
        company_city: {
            type: Sequelize.STRING
        },
       company_pin: {
            type: Sequelize.STRING
        },
       company_cin: {
            type: Sequelize.STRING
        },
       company_gst: {
            type: Sequelize.STRING
        },
       company_currency: {
            type: Sequelize.STRING
        },
       company_website: {
            type: Sequelize.STRING
        },
       company_contact_no: {
            type: Sequelize.STRING
        },
       company_alt_contact_no: {
            type: Sequelize.STRING
        },
       company_mail_id: {
            type: Sequelize.STRING
        },
       company_logo: {
            type: Sequelize.STRING
        },
       company_status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    },{
        freezeTableName:true
    });
    return company;
}
