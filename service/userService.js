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
      const userInfo = await User.findOne({where:id})
      return new UserInfoDTO({...userInfo.dataValues})
   }


   async editName(id, newInfo){

      await User.update({name:newInfo.name}, {where:{id}})
      return await User.findOne({where: {id}})
   }

   async editEmail(id, newInfo){
      const candidate = await User.findOne({where:{email:newInfo.email}})
      if(!candidate){
         await User.update({email:newInfo.email}, {where:{id}})
      }else {
         throw ApiError.badRequest('Пользоваетель с таким email уже существует')
      }
      return await User.findOne({where: {id}})
   }

   async editPassword(id, newInfo){
      const user = await User.findOne({where:{id}})
      let comparePassword = bcrypt.compareSync(newInfo.oldPassword, user.password)
      if(!comparePassword){
         throw ApiError.badRequest("Не верный пароль")
      }else{
         const hashPassword = await bcrypt.hash(newInfo.newPassword, 5)
         await User.update({password:hashPassword}, {where:{id}})
      }
      return await User.findOne({where: {id}})
   }

   async editPhone(id, newInfo){
      await User.update({phoneNumber:newInfo.phoneNumber}, {where:{id}})
      return await User.findOne({where: {id}})
   }
   async editAddress(id, newInfo){
      console.log(newInfo)
      await User.update({address:newInfo.address}, {where:{id}})
      return await User.findOne({where: {id}})
   }


}


module.exports = new userService()