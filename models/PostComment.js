module.exports = (sequelize, type) => {

  let Post = sequelize.define('postComment', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: { type: type.TEXT, allowNull: false }
  }, { tableName: 'postcomments' })
  return Post;
}