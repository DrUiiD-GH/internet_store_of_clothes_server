const catalogService = require('../service/catalogService')
class CatalogController{
    async getAllCategories(req, res){
        const data = await catalogService.getAllCategories()
        return res.json(data)
    }
    async getAllSubcategories(req, res){
        const data = await catalogService.getSubcategories()
        return res.json(data)
    }
    async getAllProducts(req, res){
        let {categoryId, subcategoryId, limit, page} = req.query
        const data = await catalogService.getProducts(categoryId, subcategoryId, limit, page)
        return res.json(data)

    }
    async getOneProduct(req, res){
        const {id} = req.params
        const data = await catalogService.getOneProduct(id)
        return res.json(data)
    }


    async createCategory(){

    }
    async createSubcategory(){

    }


}

module.exports = new CatalogController()