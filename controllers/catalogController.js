const catalogService = require('../service/catalogService')
class CatalogController{
    async getAllCategories(req, res){
        const data = await catalogService.getCategories()
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


    async createCategory(req, res){
        const data = await catalogService.createCategory(req.body.name)
        return res.json(data)
    }
    async createSubcategory(req, res, next){
        try {
            const data = await catalogService.createSubcategory(req.body.name, req.body.categoryId, req.body.typeId)
            return res.json(data)
        }catch (e){
            return next(e)
        }

    }
    async createProduct(){

    }


}

module.exports = new CatalogController()