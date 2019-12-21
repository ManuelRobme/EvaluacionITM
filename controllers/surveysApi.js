const { Survey, User } = require('../sequelize')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.addSurvey = async function (req, res) {
    const {
        survey
    } = req.body
    if (!survey) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    }
    let surveyObject = Survey.build({
        survey, userId: req.user.id
    })

    try {
        surveyObject = await surveyObject.save()
        res.status(200).jsonp({ survey: surveyObject })
    }
    catch (error) {
        console.log(error)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    }

}


exports.removeSurvey = function (req, res) {

    let surveyObjectId = Number(req.params.id)
    if (isNaN(surveyObjectId))
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });

    Survey.destroy({ where: { id: surveyObjectId } }).then(surveyObject => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.findSurveys = function (req, res) {
    Survey.findAll({
        //where: {userId: req.user.id },
        order: [['survey', 'ASC']]
    }).then((surveys) => {
        res.status(200).jsonp({ surveys })
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.findOneSurvey = function (req, res) {
    Survey.findOne({
        where: {
            id: req.params.id,
        }, include: [ User ]
    }).then((survey) => {
        console.log(req.params)
        res.status(200).jsonp({ survey });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}
