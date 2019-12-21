module.exports = (sequelize, type) => {

  let Report = sequelize.define('report', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: { type: type.STRING, allowNull: false },
    description: { type: type.TEXT, allowNull: false },
    attachments: { type: type.JSON, allowNull: false }
  }, { tableName: 'reports' })
  return Report;
}