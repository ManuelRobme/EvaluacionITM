
const Sequelize = require('sequelize')

const {
  UserModel, TokenModel, SurveyModel, TeacherModel
} = require('./models/')

const pluralize = require('pluralize')
const inflection = require('inflection')

Sequelize.useInflection({
  pluralize: pluralize.plural,
  singularize: pluralize.singular,
  underscore: inflection.underscore
})


const sequelize = new Sequelize({
  database: 'cuestionario',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

const Token = TokenModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)
const Survey = SurveyModel(sequelize, Sequelize)
const Teacher = TeacherModel(sequelize, Sequelize)

User.hasMany(Token, { onDelete: 'CASCADE' })

User.hasMany(Survey, { onDelete: 'CASCADE' })
Survey.belongsTo(User)

Teacher.hasMany(Survey, {onDelete: 'CASCADE'})
Survey.belongsTo(Teacher)

sequelize.sync({ force: false, logging: false })
  .then(() => {
    console.log('Database & tables created!')
  })

module.exports = { sequelize, User, Token, Survey, Teacher
}

