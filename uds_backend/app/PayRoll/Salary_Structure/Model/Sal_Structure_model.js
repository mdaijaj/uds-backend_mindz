module.exports = (sequelize, Sequelize) => {
    const Sal_structure = sequelize.define("Salary_Structure_dummy", {
        Sal_structure_id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id:{
            type:Sequelize.INTEGER
        },
        first_name:{
            type:Sequelize.STRING
        }, 
        last_name:{
            type:Sequelize.STRING
        }, 
        tatal_ctc:{
            type:Sequelize.STRING
        }, 
        fixed_ctc:{
            type:Sequelize.STRING
        },
        variable_ctc:{
            type:Sequelize.STRING
        },
        component_type_id:{
            type:Sequelize.INTEGER
        },
        component_name:{
            type:Sequelize.STRING
        },
        component_code:{
            type:Sequelize.STRING
        },
        record_add_By:{
            type:Sequelize.STRING
        },
        employee_id:{
            type:Sequelize.INTEGER
        },
        formula:{
            type:Sequelize.STRING
        },
        Formula_status:{
            type:Sequelize.STRING
        },
        component_status:{
            type:Sequelize.STRING
        },
        value:{
            type:Sequelize.STRING
        }
    });
    return Sal_structure;
}
