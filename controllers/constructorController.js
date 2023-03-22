const {Product, ImgForConstructor} = require("../models/models");

class ConstructorController{
    async get(req, res){
        let productsForConstructor = await Product.findAll({include:[{model:ImgForConstructor, as: 'img_for_constructor'}]})
        return res.json([productsForConstructor])
    }
}
module.exports = new ConstructorController()