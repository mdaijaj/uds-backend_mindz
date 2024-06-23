module.exports = (sequelize, Sequelize) => {
    const tbl_branch = sequelize.define("tbl_branch", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        branch_name: {
            type: Sequelize.STRING
        },
        branch_code: {
            type: Sequelize.STRING
        },
        branch_contact_person_name: {
            type: Sequelize.STRING
        },
        branch_contact_no: {
            type: Sequelize.STRING
        },
        branch_alt_contact_no: {
            type: Sequelize.STRING
        },
        branch_email: {
            type: Sequelize.STRING
        },
        branch_alt_email: {
            type: Sequelize.STRING
        },
        branch_pin_code: {
            type: Sequelize.STRING
        },
        branch_address: {
            type: Sequelize.STRING
        },
        branch_gstnumber: {
            type: Sequelize.STRING
        },
        billing_status:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        }
    },{
        freezeTableName:true
    });
    return tbl_branch;
};