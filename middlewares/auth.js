const { User, Token, Empleado } = require('../sequelize')
var jwt = require('jwt-simple');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports.authUserError = function (req, res, next) {
    

    if (!req.headers.authorization) {
        return res.status(200).jsonp({ error: { code: 403, message: "No tienes autorizacion" } });

    }

    const authorization = req.headers.authorization.split(' ')[1]

    let payload;
    try {
        payload = jwt.decode(authorization, process.env.SECRET)

    } catch (error) {
        console.log(error)
        return res.status(200).jsonp({ error: { code: 403, message: "No tienes autorizacion" } });

    }

    Token.findOne({ where: { id: payload.id, token: payload.token, logoutDate: null } }).then(token => {

        if (token) {
            User.findOne({ where: { id: token.userId } }).then(user => {

                if (user) {
                    req.user = user
                    next()

                } else {
                    res.status(200).jsonp({ error: { code: 403, message: "No tienes autorizacion" } });
                }

            })

        } else {

            res.status(200).jsonp({ error: { code: 403, message: "No tienes autorizacion" } });
        }

    }).catch(err => {
        console.log(err)
        if (err) return res.status(200).jsonp({ error: { code: 400, message: err.message }, user: null, token: null });
    });

}

