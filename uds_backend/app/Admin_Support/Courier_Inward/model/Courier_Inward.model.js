module.exports = (sequelize, Sequelize) => {
    const courierInward_Details = sequelize.define("Courier_Inward", {
        Courier_Inward_id:{
                type:Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
              },
              addressed_to_whom:{
                type:Sequelize.STRING
              },
              contact_number:{
                type:Sequelize.STRING
              },
              department:{
                type:Sequelize.STRING
              },
              senders_name :{
                type:Sequelize.STRING
              },
              senders_address:{
                type:Sequelize.STRING
              },
              courier_contain:{
                type:Sequelize.STRING
              },
              courier_service_name:{
                type:Sequelize.STRING
              },
              consignment_number:{
                type:Sequelize.STRING
              },
              received_By:{
                type:Sequelize.STRING
              },
              received_date:{
                type: Sequelize.STRING
              },
              handover_By :{
                type:Sequelize.STRING
              },
              handover_date:{
                type: Sequelize.STRING
              },
              inward_status:{
                type:Sequelize.STRING
              },
              handover_to_whom:{
                type:Sequelize.STRING
              },
              remarks:{
                type:Sequelize.STRING
              },
              web_site_url:{
                type:Sequelize.STRING
              },
              email:{
                type:Sequelize.STRING
              },
              emp_id:{
                type:Sequelize.INTEGER
              },
              courier_status: {
                type: Sequelize.ENUM("ACCEPETED", "REJECTED", "RE-DIRECTED", "RECEIVED"),
                defaultValue: "RECEIVED"
            },
              status: {
                type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
                defaultValue: "ACTIVE"
            },
            accept_reject_date:{
              type:Sequelize.STRING
            },
            Redirected_to_Whom:{
              type: Sequelize.STRING
            },
            Redirected_email:{
              type: Sequelize.STRING
            }
    });
  
    return courierInward_Details;
  };