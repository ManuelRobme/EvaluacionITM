module.exports = (sequelize, type) => {

    let Maestro = sequelize.define('teacher', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: type.STRING, allowNull: false },
      fatherLastName: { type: type.STRING, allowNull: false },
      motherLastName: { type: type.STRING, allowNull: false },
    }, { tableName: 'teachers' })
    return Maestro;
  }