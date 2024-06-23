module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("procurement_po_approvel_level", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        level: {
            type: Sequelize.JSON
        },
        Approver_remarks: {
            type: Sequelize.STRING
        },
        Approvel_status: {
            type: Sequelize.ENUM("APPROVED", "PENDING","REJECTED","PUSH BACK"),
            defaultValue: "PENDING"
        },
        progressStatus: {
            type: Sequelize.ENUM("OPEN", "CLOSE"),
            defaultValue: "OPEN"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    },
        {
            freezeTableName: true
        });
    return procurement
}