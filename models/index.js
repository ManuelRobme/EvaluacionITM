const UserModel = require("./User")
const TokenModel = require("./Token")
const CommunityModel = require("./Community")
const PostModel = require("./Post")
const PostCommentModel = require("./PostComment")
const ReportModel = require("./Report")
const ReportCommentModel = require("./ReportComment")
const UserCommunityModel = require("./UserCommunity")
const ReportTypeModel = require("./ReportType")
const SurveyModel = require("./Survey")
const TeacherModel = require("./Teacher")

module.exports = { 
    UserModel, TokenModel, CommunityModel, PostModel, PostCommentModel, ReportCommentModel, ReportModel, 
    UserCommunityModel, ReportTypeModel, SurveyModel, TeacherModel
}