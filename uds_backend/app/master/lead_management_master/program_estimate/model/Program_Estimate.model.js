module.exports = (sequelize, Sequelize) => {
    const Program_Estimate = sequelize.define("Program_Estimate", {
        Program_Estimate_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        open_house_training_id:{
            type: Sequelize.INTEGER,
        },
        Trainer_Cost: {
            type: Sequelize.INTEGER,
        },
        travel_Cost: {
            type: Sequelize.INTEGER,
        },
        trainer_Stay_Charges: {
            type: Sequelize.INTEGER
        },
        trainer_Local_Travel: {
            type: Sequelize.INTEGER,
        },
        BDE_Local_Travel: {
            type: Sequelize.INTEGER,
        },
        hall_Charges: {
            type: Sequelize.INTEGER,
        },
        projector_Charges: {
            type: Sequelize.INTEGER,
        },
        participant_Kit: {
            type: Sequelize.INTEGER,
        },
        total_Cost: {
            type: Sequelize.INTEGER,
        },
        // Head: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        // },
        

            ABTrainer_Cost:{
                type: Sequelize.INTEGER,
            },
            ABtravel_Cost:{
                type: Sequelize.INTEGER,
            },
            ABtrainer_Stay_Charges:{
                type: Sequelize.INTEGER,
            },
            ABtrainer_Local_Travel:{
                type: Sequelize.INTEGER,
            },
            ABBDE_Local_Travel:{
                type: Sequelize.INTEGER,
            },
            ABhall_Charges:{
                type: Sequelize.INTEGER,
            },
            ABprojector_Charges:{
                type: Sequelize.INTEGER,
            },
            ABparticipant_Kit:{
                type: Sequelize.INTEGER,
            },
            ABtotal_Cost:{
                type: Sequelize.INTEGER,
            },

            SOTrainer_Cost:{
                type: Sequelize.INTEGER,
            },
            SOtravel_Cost:{
                type: Sequelize.INTEGER,
            },
            SOtrainer_Stay_Charges:{
                type: Sequelize.INTEGER,
            },
            SOtrainer_Local_Travel:{
                type: Sequelize.INTEGER,
            },
            SOBDE_Local_Travel:{
                type: Sequelize.INTEGER,
            },
            SOhall_Charges:{
                type: Sequelize.INTEGER,
            },
            SOprojector_Charges:{
                type: Sequelize.INTEGER,
            },
            SOparticipant_Kit:{
                type: Sequelize.INTEGER,
            },
            SOtotal_Cost:{
                type: Sequelize.INTEGER,
            },
        // BD data above
        pre_program_estimate: {
            type: Sequelize.INTEGER,
        },
        actual_as_bill: {
            type: Sequelize.BIGINT,
        },
        oversheet: {
            type: Sequelize.INTEGER,
        },
        AssTrainer_Fee:{
            type: Sequelize.INTEGER,
        },
        AssProjector_Cost:{
            type: Sequelize.INTEGER,
        },
        AssTrainerStay:{
            type: Sequelize.INTEGER,
        },
        AssPrice_Kit:{
            type: Sequelize.INTEGER
        },
        AssAdditional_Hallcharges:{
            type: Sequelize.INTEGER
        },
        AssHall_charges:{
             type: Sequelize.INTEGER,
        },
        ass_remaks:{
            type: Sequelize.INTEGER,
        },
        type_of_bill: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
        },
    });
    return Program_Estimate;
};