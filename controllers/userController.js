const ApiError = require('../error/ApiError')
class UserController{
    async registration(req, res){}
    async login(req, res){}
    async check(req, res, next){
        const {id} = req.query
        if(!id){
            return next(ApiError.badRequest("Не указан ID пользователя"))
        }
        return res.status(200).json({message: `${id} ID пользователя`})
    }
}

module.exports = new UserController()