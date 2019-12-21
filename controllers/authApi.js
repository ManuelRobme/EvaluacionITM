var SHA3 = require('crypto-js/sha3');
var encHex = require('crypto-js/enc-hex');
const { User, Token } = require('../sequelize')
const { UniqueConstraintError } = require("sequelize")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var path = require('path');

var jwt = require('jwt-simple');

const uuidv4 = require('uuid/v4');




module.exports.signIn = function (req, res) {

    if (!req.body.email || !req.body.password) return res.status(200).jsonp({ error: { code: 50, message: "Datos incompletos" }, user: null, token: null });

    console.log(req.body.email.toLowerCase())
    User.findOne({ where: { email: req.body.email.toLowerCase(), password: SHA3(req.body.password).toString(encHex) } }).then(function (user) {

        if (user) {
            let token = Token.build({ userId: user.id, ip: req.ip, loginDate: new Date(), lastConnection: new Date(), token: uuidv4() })
            token.save().then(() => {
                generateToken(req, res, token)
            }).catch(err => {
                console.log(err)
                return res.status(200).jsonp({ error: { code: 1, message: err.message } });
            })
        } else return res.status(200).jsonp({ error: { code: 54, message: "Usuario o contraseña incorrecta" } })

    }).catch(err => {
        console.log(err)
        return res.status(200).jsonp({ error: { code: 1, message: err.message } });
    });

}


module.exports.validateToken = async function (req, res) {

    if (!req.headers.authorization) return res.status(200).jsonp({ error: { code: 50, message: "Datos incompletos" }, user: null, token: null });

    let payload

    try {
        const token = req.headers.authorization.split(' ')[1]
        payload = jwt.decode(token, process.env.SECRET)



    } catch (err) {
        return res.status(200).jsonp({ error: { code: 55, message: "User no encontrado" }, user: null, token: null });

    }
    if (!payload || !payload.token) return res.status(200).jsonp({ error: { code: 50, message: "Datos incompletos" }, user: null, token: null });
    try {
        let token = await Token.findOne({ where: { id: payload.id, token: payload.token, logoutDate: null }, attributes: { exclude: ['password'] } })
        if (token) {

            token.lastConnection = new Date()
            token.ip = req.ip
            token.save()


            generateToken(req, res, token)

        } else {
            res.status(200).jsonp({ error: { code: 56, message: "Token no encontrado" }, user: null, token: null });


        }
    } catch (err) {
        return res.status(200).jsonp({ error: { code: 1, message: err.message }, user: null, token: null });
    }






}

module.exports.validateTokenAsync = async function (tokenHash) {


    let payload

    try {

        payload = jwt.decode(tokenHash, process.env.SECRET)



    } catch (err) {
        return { user: null, token: null }

    }

    if (!payload || !payload.token) return { user: null, token: null }
    try {
        let token = await Token.findOne({ where: { id: payload.id, token: payload.token, logoutDate: null } })
        if (token) {

            token.lastConnection = new Date()
            //token.ip = req.ip
            await token.save()

            //console.log(token)
            let user = await User.findOne({ where: { id: token.userId }, attributes: { exclude: ['password'] } })
            if (user) {
                //console.log(user)
                let userJson = user.toJSON()
                console.log("validateTokenAsync ", user.email)
                return { user: userJson, token: token.token }

            } else {
                return { user: null, token: null }

            }



        } else {
            return { user: null, token: null }


        }
    } catch (err) {
        console.log(err)
        return { user: null, token: null }
    }






}

module.exports.activeAccount = function (req, res) {
    let id;
    try {
        const decryptedString = cryptr.decrypt(req.params.hash);
        id = Number(decryptedString);
    } catch (err) {
        return res.sendFile('404.html', { root: "./views" })
    }


    if (isNaN(id)) {
        res.sendFile('404.html', { root: "./views" })
    }
    User.findOne({ where: { id, isActive: false } }).then(function (user) {
        if (user) {
            user.isActive = true
            user.save().then(user => {
                res.sendFile('active.html', { root: "./views" })

            }).catch(err => {
                res.sendFile('404.html', { root: "./views" })
            })

        } else {
            res.sendFile('404.html', { root: "./views" })
        }



    }).catch(err => {
        console.log(err)
        return res.status(200).jsonp({ error: { code: 400, message: err.message } });
    });

}


module.exports.validateStripe = async function (req, res) {

    const { code, scope, state } = req.body
    if (!code || !scope || !state) {
        res.status(200).jsonp({ error: { code: 400, message: "La solicitud no se ha registrado correcamente" } });
    }

    const user = await User.findOne({ where: {id: state} });

    if(!user){
        res.status(200).jsonp({ error: { code: 400, message: "No se ha encontrado al usuario" } });
    }

    stripe.oauth.token({
        grant_type: 'authorization_code',
        code,
    }).then(async function (response) {
        console.log({stripeResponse: response})
        user.accountId = response.stripe_user_id;
        await user.save()
        res.status(200).jsonp({ error: null });
    }).catch(() => {
        res.status(200).jsonp({ error: { code: 400, message: "La solicitud no se ha registrado correcamente" } });
    });

}


module.exports.signUp = async function (req, res) {
    let emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    const { email, password, name, fatherLastName, motherLastName, birthDate } = req.body
    console.log({ ...req.body })

    if (!email || !password || !name || !fatherLastName || !motherLastName || !birthDate) {

        return res.status(200).jsonp({ error: { code: 50, message: "Datos incompletos (email, password, name, lastName, phone)" }, user: null, token: null });
    }
    if (!emailReg.test(email)) {
        return res.status(200).jsonp({ error: { code: 51, message: "Email invalido" }, user: null, token: null });
    }
    if (password.length < 6) {
        return res.status(200).jsonp({ error: { code: 52, message: "La contraseña debe ser mayor de cinco caracteres" }, user: null, token: null });
    }

    var user = User.build({
        email: email.toLowerCase(),
        password: SHA3(password).toString(encHex),
        name,
        fatherLastName,
        motherLastName,
        birthDate
    })

    user.save().then(async user => {


        let token = Token.build({ userId: user.id, ip: req.ip, loginDate: new Date(), lastConnection: new Date(), token: uuidv4() })
        token.save().then(() => {
            generateToken(req, res, token)
        })

    }).catch(err => {
        console.log(err)
        if (err instanceof UniqueConstraintError) {
            res.status(200).jsonp({ error: { code: 53, message: "Email en uso" } })
        } else {
            return res.status(200).jsonp({ error: { code: 1, message: "Se ha producido un error (catch), consulte Log de la consola." } })
        }
    })
}





function generateToken(req, res, token) {
    let tokenEncoded = jwt.encode(token.toJSON(), process.env.SECRET);

    User.findOne({ where: { id: token.userId }, attributes: { exclude: ['password'] } }).then(user => {


        if (user) {

            let userJson = user.toJSON()

            res.status(200).jsonp({ user: userJson, token: tokenEncoded });

        } else {

            res.status(200).jsonp({ error: { code: 4001, message: "User no encontrado" }, user: null, token: null });

        }


    })
}