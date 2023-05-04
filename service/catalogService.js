const ProductsDto = require('../dtos/products-dto')

const {Category, Subcategory, Product, ImgForCatalog, ProductInfo} = require("../models/models");

class CatalogService{
    async getAllCategories(){
        return await Category.findAll({order:['id']})
    }

    async getSubcategories(){
        return await Category.findAll(
            {include: {model: Subcategory, as: 'subcategories'}, order:['id']}
        )
    }

    async getProducts(categoryId, subcategoryId, limit, page){
        page = page || 1
        limit = limit || 9
        let offset = (page-1)*limit
        let products
        if(subcategoryId){
            products = await Product.findAndCountAll({where:{subcategoryId}, include:[{model:ImgForCatalog}], limit, offset})
        }else if(categoryId){
            products = await Product.findAndCountAll({include: [{model:Subcategory, where:{categoryId}}, {model:ImgForCatalog}], limit, offset})
        }else {
            products = await Product.findAndCountAll({include:[{model:Subcategory}], limit, offset})
        }

       return new ProductsDto({...products})
       // return products
    }

    async getOneProduct(id){
        return await Product.findOne(
                {
                    where: {id},
                    include: [{model: ProductInfo}, {model: ImgForCatalog}]
                })
    }



}
module.exports = new CatalogService()