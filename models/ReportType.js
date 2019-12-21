module.exports = (sequelize, type) => {

  let ReportType = sequelize.define('reportType', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: type.STRING, allowNull: false },
    description: { type: type.TEXT, allowNull: false }
  }, { tableName: 'reporttypes' })
  return ReportType;
}