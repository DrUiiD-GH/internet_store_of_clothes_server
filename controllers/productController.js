const {Product, ProductInfo, ImgForCatalog} = require("../models/models");

class ProductController{
    async getAll(req, res){
        let {categoryId, subcategoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = (page-1)*limit
        let products
        if(subcategoryId){
            products = await Product.findAndCountAll({where:{subcategoryId}, limit, offset})
        }else if(categoryId){
            products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }else {
            products = await Product.findAndCountAll({limit, offset})
        }
        return res.json(products)
    }
    async getOne(req, res){
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'product_infos'}, {model: ImgForCatalog, as: 'img_for_catalogs'}]
            }
        )
        return res.json(product)
    }
}
module.exports = new ProductController()