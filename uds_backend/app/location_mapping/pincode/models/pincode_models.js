module.exports = (sequelize, Sequelize) => {
    const pincodeDetails = sequelize.define("pincode", {
        pincode_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pincode_name: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        city_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'city',
            //     key: 'city_id',
            // },
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull: true
        },

    });
    return pincodeDetails;
};