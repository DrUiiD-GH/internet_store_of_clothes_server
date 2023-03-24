const constructorService = require("../service/constructorService");

class ConstructorController{
    async get(req, res){
        const products = await constructorService.getProducts()
        return res.json(products)
    }
}
module.exports = new ConstructorController()