module.exports = (sequelize, type) => {

  let Post = sequelize.define('post', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: { type: type.STRING, allowNull: false },
    description: { type: type.TEXT, allowNull: false }
  }, { tableName: 'posts' })
  return Post;
}