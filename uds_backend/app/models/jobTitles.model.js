module.exports = (sequelize, Sequelize) => {
    const jobTitles = sequelize.define("job_titles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      job_title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      }
    });
    return jobTitles;
}