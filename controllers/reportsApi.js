const { Report, User, ReportComment, ReportType } = require('../sequelize')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.addReport = async function (req, res) {
    const {
        title, description, communityId, reportTypeId
    } = req.body
    if (!title || !description || isNaN(communityId) || isNaN(reportTypeId)) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    }

    if(req.files) req.files.forEach(elem => {
        delete elem.buffer
    })

    let report = Report.build({
        title, description, userId: req.user.id, communityId, reportTypeId, attachments: req.files || []
    })
  
    try {
        report = await report.save()
        res.status(200).jsonp({ report })
    }
    catch (error) {
        console.log(error)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    }

}

exports.updateReport = function(req, res) {
    console.log(req.body)
    let reportId = Number(req.params.id)
    if(isNaN(reportId)){
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });
    }
    const {
        title, description, reportTypeId
    } = req.body
    if (!title || !description || isNaN(reportTypeId)) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    } 
    let query = {
        title, description, reportTypeId
    }

    Report.update(query, {where: {id: reportId}}).then(report => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.removeReport = function (req, res) {

    let reportId = Number(req.params.id)
    if (isNaN(reportId))
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });

    Report.destroy({ where: { id: reportId } }).then(report => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.findReports = function (req, res) {
    Report.findAll({
        //where: {userId: req.user.id },
        report: [['title', 'ASC']]
    }).then((reports) => {
        res.status(200).jsonp({ reports: reports })
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.findOneReport = function (req, res) {
    Report.findOne({
        where: {
            id: req.params.id,
        }, include: [ User, {model: ReportComment, include: [{model: User}]} ]
    }).then((report) => {
        console.log(req.params)
        res.status(200).jsonp({ report: report });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.addComment = async function (req, res) {
    const {
        comment, reportId
    } = req.body
    if (!comment || isNaN(reportId)) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    }
    let reportComment = ReportComment.build({
        comment, userId: req.user.id, reportId
    })
    if (req.imageUrl) {
        reportComment.image = req.imageUrl;
    } else {
        reportComment.image = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";
    }
    try {
        reportComment = await reportComment.save()
        res.status(200).jsonp({ reportComment })
    }
    catch (error) {
        console.log(error)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    }

}


exports.removeComment = function (req, res) {

    let reportCommentId = Number(req.params.id)
    if (isNaN(reportCommentId))
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });

    ReportComment.destroy({ where: { id: reportCommentId } }).then(reportComment => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}


exports.findReportTypes = function (req, res) {
    ReportType.findAll({
        order: [['name', 'ASC']]
    }).then((reportTypes) => {
        res.status(200).jsonp({ reportTypes })
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}