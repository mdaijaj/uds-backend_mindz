module.exports = (sequelize, Sequelize) => {
    const CourierOutwardDetails = sequelize.define("Courier_Outward", {
        courier_Outward_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        emp_id:{
            type: Sequelize.INTEGER,
        },
        from_whom: {
            type: Sequelize.STRING
        },
        department:{
            type: Sequelize.STRING
        },
        employee_mail_id:{  
            type: Sequelize.STRING
        },
        received_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        received_By: {
            type: Sequelize.STRING
        },
        courier_outward_type:{
            type: Sequelize.STRING
        },
        courier_contain:{
            type: Sequelize.STRING
        },
        document_type:{
            type: Sequelize.JSON
        },
        client_name_to_dispatch:{
            type: Sequelize.STRING
        },
        client_address_to_dispatch:{
            type: Sequelize.STRING
        },
        Receiver_contact_number:{
            type: Sequelize.STRING
        },
        courier_service_name:{
            type: Sequelize.STRING
        },
        consignment_number:{
            type:Sequelize.STRING
        },
        dispatched_by:{
            type: Sequelize.STRING
        },
        dispatched_date:{
            type: Sequelize.STRING
        },
        outward_status:{
            type: Sequelize.STRING
        },
        date_of_delivery:{
            type: Sequelize.STRING
        },
        proof_of_delivery:{
            type: Sequelize.STRING
        },
        remark:{
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return CourierOutwardDetails;
}
