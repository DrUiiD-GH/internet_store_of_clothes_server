const {Product, ImgForConstructor, Subcategory, Category} = require("../models/models");

class ConstructorService{
    async getProducts (){
        return await Product.findAll({include: [{model: ImgForConstructor}, {model:Subcategory}]})
    }
}

module.exports = new ConstructorService()