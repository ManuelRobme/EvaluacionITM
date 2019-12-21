module.exports = (sequelize, type) => {

  let Post = sequelize.define('userCommunity', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  }, { tableName: 'usercommunities' })
  return Post;
}