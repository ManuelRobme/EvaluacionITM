module.exports = (sequelize, type) => {

  let Store = sequelize.define('community', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: type.STRING, allowNull: false },
    description: { type: type.STRING, allowNull: false },
    image: { type: type.STRING, allowNull: false },
  }, { tableName: 'communities' })
  return Store;
}