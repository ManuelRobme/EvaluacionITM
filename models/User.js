module.exports = (sequelize, type) => {

  let Usuario = sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: { type: type.STRING, allowNull: false, unique: true },
    password: { type: type.STRING, allowNull: false },
    name: { type: type.STRING, allowNull: false },
    fatherLastName: { type: type.STRING, allowNull: false },
    motherLastName: { type: type.STRING, allowNull: false },
    birthDate: { type: type.DATE, allowNull: false }
  }, { tableName: 'users' })
  return Usuario;
}