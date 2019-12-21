const { Community, Post, User, Report, UserCommunity, ReportType } = require('../sequelize')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.addCommunity = async function (req, res) {
    const {
        name, description
    } = req.body
    if (!name || !description ) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    }
    let community = Community.build({
        name, description
    })
    if (req.imageUrl) {
        community.image = req.imageUrl;
    } else {
        community.image = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";
    }
    try {
        community = await community.save()
        res.status(200).jsonp({ community })
    }
    catch (error) {
        console.log(error)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    }

}

exports.updateCommunity = function(req, res) {
    let communityId = Number(req.params.id)
    if(isNaN(communityId)){
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });
    }
    const {
        name, description
    } = req.body
    if (!name || !description) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    } 
    let query = {
        name, description
    }
    if (req.imageUrl) {
        query.image = req.imageUrl;
    }

    Community.update(query, {where: {id: communityId}}).then(community => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.removeCommunity = function (req, res) {

    let communityId = Number(req.params.id)
    if (isNaN(communityId))
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });

    Community.destroy({ where: { id: communityId } }).then(community => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}



exports.findCommunities = function (req, res) {
    Community.findAll({
        //where: {userId: req.user.id },
        community: [['name', 'ASC']]
    }).then((communities) => {
        res.status(200).jsonp({ communities: communities })
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.findOneCommunity = function (req, res) {
    Community.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            { model: Post, include: [User] },
            { model: Report, include: [User, ReportType] },
            { model: User }
        ]
    }).then((community) => {
        res.status(200).jsonp({ community: community });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.removeUserCommunity = async function (req, res) {
    const { userCommunityId } = req.params
    if (isNaN(userCommunityId)) {
        return res.status(200).jsonp({ error: { code: 100, message: "Datos incompletos (userCommunityId)" } });
    }

    try {
        await UserCommunity.destroy({ where: { id: userCommunityId } })
        return res.status(200).jsonp({ error: null })

    } catch (err) {
        console.log(err)
        res.status(500).jsonp({ error: { code: 0, message: "Se ha producido un error (catch), consulte Log de la consola." } })

    }

}