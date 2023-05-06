const ApiError = require('../error/ApiError')
const {User, Basket} = require("../models/models");
const bcrypt = require('bcrypt')
const userService = require('../service/userService')
const tokenService = require('../service/tokenService')
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
            next(e)
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

    async editInfo(req, res, next){
        try {
            const data = await userService.editInfo(req.user.id, req.body)
            return res.json(data)
        }catch (e){
            return next(e)
        }

    }

}

module.exports = new UserController()