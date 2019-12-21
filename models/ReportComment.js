module.exports = (sequelize, type) => {

  let ReportComment = sequelize.define('reportComment', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: { type: type.TEXT, allowNull: false }
  }, { tableName: 'reportcomments' })
  return ReportComment;
}