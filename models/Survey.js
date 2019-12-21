module.exports = (sequelize, type) => {

  let Survey = sequelize.define('survey', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    survey: { type: type.JSON, allowNull: false }
  }, { tableName: 'surveys' })
  return Survey;
}