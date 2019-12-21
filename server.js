const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const multer = require('multer')
const port = process.env.PORT || 5000
const next = require('next')
require('dotenv').config()

const { sequelize, User, Token } = require('./sequelize')
const { authUserError } = require('./middlewares/auth')
const { authApi, communitiesApi, postsApi, surveysApi, teachersApi } = require('./controllers/');

const { uploadImage, uploadFiles } = require('./middlewares/storage');
let bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev, dir: 'web' })
const routes = require('./web/routes')
const handler = routes.getRequestHandler(nextApp)

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 //10 MB
  }
})

if (dev) {
  configServer()
} else {
  nextApp
    .prepare()
    .then(() => {

      configServer();

    })
    .catch(ex => {
      console.log(ex)
      process.exit(1)
    })
}


function configServer() {
  var app = new express();



  const api = express.Router()
  const auth = express.Router()
  const communities = express.Router()
  const posts = express.Router()
  const surveys = express.Router()
  const teachers = express.Router()

  app.use(cors())
  app.use(morgan('dev', { skip: function (req, res) { return !req.originalUrl.includes('api') } }))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser())
  app.set('trust proxy', true)

  app.use('/api', api)
  api.use('/auth', auth)
  api.use('/communities', communities)
  api.use('/posts', posts)
  api.use('/surveys', surveys)
  api.use('/teachers', teachers)

  // Auth API
  auth.route('/login')
    .post(authApi.signIn)
  auth.route('/active/:hash')
    .get(authApi.activeAccount)

  auth.route('/token/')
    .post(authApi.validateToken)

  auth.route('/signup')
    .post(authApi.signUp)



  // Communities API
  communities.route('/')
    .get(communitiesApi.findCommunities)

  communities.route('/:id')
    .delete(communitiesApi.removeCommunity)

  communities.route('/:id')
    .put(upload.single("image"), uploadImage, communitiesApi.updateCommunity)

  communities.route('/')
    .post(upload.single("image"), uploadImage, communitiesApi.addCommunity)

  communities.route('/:id')
    .get(communitiesApi.findOneCommunity)

  communities.route('/:userCommunityId/user')
    .delete(communitiesApi.removeUserCommunity)

  // Posts API
  posts.route('/')
    .get(postsApi.findPosts)

  posts.route('/:id')
    .put(postsApi.updatePost)

  posts.route('/')
    .post(authUserError, postsApi.addPost)

  posts.route('/:id')
    .get(postsApi.findOnePost)

  posts.route('/comment')
    .post(authUserError, postsApi.addComment)

  posts.route('/comment/:id')
    .delete(postsApi.removePost)

  posts.route('/:id')
    .delete(postsApi.removePost)

  // Reports API
  surveys.route('/')
    .get(surveysApi.findSurveys)

  surveys.route('/')
    .post(authUserError, surveysApi.addSurvey)

  surveys.route('/:id')
    .get(surveysApi.findOneSurvey)

  surveys.route('/:id')
    .delete(surveysApi.removeSurvey)

  
    // Teachers API
    teachers.route('/')
    .get(teachersApi.findTeachers)

    teachers.route('/:id')
    .delete(teachersApi.removeTeacher)

    teachers.route('/:id')
    .put(upload.single("image"), uploadImage, teachersApi.updateTeacher)

    teachers.route('/')
    .post(upload.single("image"), uploadImage, teachersApi.addTeacher)

    teachers.route('/:userTeacherId/user')
    .delete(teachersApi.removeUserTeacher)



  if (!dev) {
    app.use(handler);
  }



  app.listen(port, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:5000')
  })
}

//module.exports = app;

