const constructorService = require("../service/constructorService");

class ConstructorController{
    async get(req, res){
        let {categoryId, subcategoryId} = req.query
        const data = await constructorService.getProducts(categoryId, subcategoryId)
        return res.json(data)
    }
}
module.exports = new ConstructorController()