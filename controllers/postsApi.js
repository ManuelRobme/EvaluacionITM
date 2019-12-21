const { Post, User, PostComment } = require('../sequelize')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.addPost = async function (req, res) {
    const {
        title, description, communityId
    } = req.body
    if (!title || !description || isNaN(communityId)) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    }
    let post = Post.build({
        title, description, userId: req.user.id, communityId
    })
    if (req.imageUrl) {
        post.image = req.imageUrl;
    } else {
        post.image = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";
    }
    try {
        post = await post.save()
        res.status(200).jsonp({ post })
    }
    catch (error) {
        console.log(error)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    }

}

exports.updatePost = function(req, res) {
    let postId = Number(req.params.id)
    if(isNaN(postId)){
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });
    }
    const {
        title, description
    } = req.body
    if (!title || !description) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    } 
    let query = {
        title, description
    }
    if (req.imageUrl) {
        query.image = req.imageUrl;
    }

    Post.update(query, {where: {id: postId}}).then(post => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.removePost = function (req, res) {

    let postId = Number(req.params.id)
    if (isNaN(postId))
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });

    Post.destroy({ where: { id: postId } }).then(post => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.findPosts = function (req, res) {
    Post.findAll({
        //where: {userId: req.user.id },
        post: [['title', 'ASC']]
    }).then((posts) => {
        res.status(200).jsonp({ posts: posts })
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.findOnePost = function (req, res) {
    Post.findOne({
        where: {
            id: req.params.id,
        }, include: [ User, {model: PostComment, include: [{model: User}]} ]
    }).then((post) => {
        console.log(req.params)
        res.status(200).jsonp({ post: post });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}

exports.addComment = async function (req, res) {
    const {
        comment, postId
    } = req.body
    if (!comment || isNaN(postId)) {
        return res.status(200).jsonp({ error: { code: 100, message: 'Datos Incompletos' } })
    }
    let postComment = PostComment.build({
        comment, userId: req.user.id, postId
    })
    if (req.imageUrl) {
        postComment.image = req.imageUrl;
    } else {
        postComment.image = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";
    }
    try {
        postComment = await postComment.save()
        res.status(200).jsonp({ postComment })
    }
    catch (error) {
        console.log(error)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    }

}


exports.removeComment = function (req, res) {

    let postCommentId = Number(req.params.id)
    if (isNaN(postCommentId))
        return res.status(200).jsonp({ error: { code: 1903, message: "Registro inválido (id)" } });

    PostComment.destroy({ where: { id: postCommentId } }).then(postComment => {
        res.status(200).jsonp({ error: null });
    }).catch(err => {
        console.log(err)
        res.status(200).jsonp({ error: { code: 1904, message: "Se ha producido un error (catch), consulte Log de la consola." } })
    });
}
