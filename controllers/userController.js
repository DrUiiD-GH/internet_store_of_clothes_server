
const userService = require('../service/userService')

const {validationResult} = require('express-validator')


class UserController{
    async registration(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json(errors.array())
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            return res.json(userData)
        }catch (e){
            return next(e)
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body
            const data = await userService.login(email, password, next)
            return res.json(data)
        }catch (e){
            return next(e)
        }

    }
    async check(req, res, next){
        const data = await userService.check(req.user.id, req.user.email)
        return res.json(data)
    }




    async getInfo(req, res, next){
        const data = await userService.getInfo(req.user.id)
        return res.json(data)
    }


    async editName(req, res, next){
        try {
            const data = await userService.editName(req.user.id, req.body)
            return res.json(data)
        }catch (e){
            return next(e)
        }
    }

    async editEmail(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json(errors.array())
            }
            const data = await userService.editEmail(req.user.id, req.body)
            return res.json(data)
        }catch (e){
            return next(e)
        }
    }

    async editPassword(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json(errors.array())
            }
            const data = await userService.editPassword(req.user.id, req.body)
            return res.json(data)
        }catch (e){
            return next(e)
        }
    }

    async editPhone(req, res, next){
        try {

            const data = await userService.editPhone(req.user.id, req.body)
            return res.json(data)
        }catch (e){
            return next(e)
        }
    }

    async editAddress(req, res, next){
        try {
            const data = await userService.editAddress(req.user.id, req.body)
            return res.json(data)
        }catch (e){
            return next(e)
        }
    }

}

module.exports = new UserController()