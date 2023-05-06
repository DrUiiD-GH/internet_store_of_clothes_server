const ApiError = require("../error/ApiError");
const {User, Basket} = require("../models/models");
const bcrypt = require("bcrypt");
const tokenService = require("./tokenService")
const UserInfoDTO = require("../dtos/userInfo-dto");

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
         throw ApiError.badRequest("Не верный пароль")
      }
      const token = tokenService.generateJwt(user.id, user.email)
      return {token}
   }

   async check(id, email){
      const token = tokenService.generateJwt(id, email)
      return {token}
   }

   async getInfo(id){
      const user = await User.findOne({where:id})
      return new UserInfoDTO({...user.dataValues})
   }


   async editInfo(id, newInfo){
      let user

      if(newInfo.email){await User.update({email:newInfo.email}, {where:{id}})}
      if(newInfo.name){await User.update({name:newInfo.name}, {where:{id}})}
      if(newInfo.phoneNumber){await User.update({phoneNumber:newInfo.phoneNumber}, {where:{id}})}
      if(newInfo.address){await User.update({address:newInfo.address}, {where:{id}})}
      if(newInfo.newPassword){
         user = await User.findOne({where:{id}})
         let comparePassword = bcrypt.compareSync(newInfo.oldPassword, user.password)
         console.log(comparePassword)
         if(!comparePassword){
            throw ApiError.badRequest("Не верный пароль")
         }else{
            const hashPassword = await bcrypt.hash(newInfo.newPassword, 5)
            await User.update({password:hashPassword}, {where:{id}})
         }
      }

      user = await User.findOne({where:{id}})
      console.log(newInfo.newPassword)

      return user
   }




}


module.exports = new userService()