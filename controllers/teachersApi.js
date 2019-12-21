const { Teacher, UserTeacher} = require('../sequelize')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.addTeacher = async function (req, res) {
    const {
        name, fatherLastName, motherLastName
    } = req.body
    if (!name || !fatherLastName || !motherLastName ) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    }
    let teacher = Teacher.build({
        name, fatherLastName, motherLastName
    })
    if (req.imageUrl) {
        teacher.image = req.imageUrl;
    } else {
        teacher.image = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";
    }
    try {
        teacher = await teacher.save()
        res.status(200).jsonp({ teacher })
    }
    catch (error) {
        console.log(error)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    }

}

exports.updateTeacher = function(req, res) {
    let teacherId = Number(req.params.id)
    if(isNaN(teacherId)){
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });
    }
    const {
        name, fatherLastName, motherLastName
    } = req.body
    if (!name || !fatherLastName || !motherLastName) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    } 
    let query = {
        name, fatherLastName, motherLastName
    }
    if (req.imageUrl) {
        query.image = req.imageUrl;
    }

    Teacher.update(query, {where: {id: teacherId}}).then(teacher => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.removeTeacher = function (req, res) {

    let teacherId = Number(req.params.id)
    if (isNaN(teacherId))
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });

    Teacher.destroy({ where: { id: teacherId } }).then(teacher => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}



exports.findTeachers = function (req, res) {
    Teacher.findAll({
        //where: {userId: req.user.id },
        teacher: [['name', 'ASC']]
    }).then((teachers) => {
        res.status(200).jsonp({ teachers: teachers })
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}


exports.removeUserTeacher = async function (req, res) {
    const { userTeacherId } = req.params
    if (isNaN(userTeacherId)) {
        return res.status(200).jsonp({ error: { code: 100, message: "Datos incompletos (userTeacherId)" } });
    }

    try {
        await UserTeacher.destroy({ where: { id: userTeacherId } })
        return res.status(200).jsonp({ error: null })

    } catch (err) {
        console.log(err)
        res.status(500).jsonp({ error: { code: 0, message: "Se ha producido un error (catch), consulte Log de la consola." } })

    }

}