const ApiError = require("../error/ApiError");
const {User, Basket} = require("../models/models");
const bcrypt = require("bcrypt");
const tokenService = require("./tokenService")

class userService{
   async registration(email, password){
      const candidate = await User.findOne({where:{email}})
      if(candidate){
         throw ApiError.badRequest("Пользователь с таким email уже существует")
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({email, password: hashPassword})
      const basket = await Basket.create({userId:user.id})
      const token = tokenService.generateJwt(user.id, user.email)
      return {token}
   }

   async login(email, password){
      const user = await User.findOne({where:{email}})
      if(!user){
         throw ApiError.badRequest("Не верный email")
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if(!comparePassword){
         throw ApiError.badRequest("Не верный password")
      }
      const token = tokenService.generateJwt(user.id, user.email)
      return {token}
   }

   async check(id, email){
      const token = tokenService.generateJwt(id, email)
      return {token}
   }



}


module.exports = new userService()