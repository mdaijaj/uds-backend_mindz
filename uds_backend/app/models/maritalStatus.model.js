module.exports = (sequelize, Sequelize) => {
    const maritalStatusData = sequelize.define("maritalStatus", {
  
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      gender:{
        type:Sequelize.ENUM,
        values:['male','female'],
        
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'ACTIVE'
      }
    });
  
  
    return maritalStatusData;
  };