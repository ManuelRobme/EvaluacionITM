module.exports = (sequelize, type) => {

    let Token = sequelize.define('token', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ip: type.STRING,
        loginDate: type.DATE,
        lastConnection: type.DATE,
        logoutDate: type.DATE,
        token: type.STRING
    })

    return Token;


}