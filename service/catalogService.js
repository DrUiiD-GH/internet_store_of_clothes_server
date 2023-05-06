const ProductsDto = require('../dtos/products-dto')

const {Category, Subcategory, Product, ImgForCatalog, ProductInfo, ImgForConstructor} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid")
const path = require('path')

class CatalogService{
    async getCategories(){
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
            products = await Product.findAndCountAll({where:{subcategoryId}, include:[{model:ImgForCatalog}, {model:Subcategory}], limit, offset})
        }else if(categoryId){
            products = await Product.findAndCountAll({include: [{model:Subcategory, where:{categoryId}}, {model:ImgForCatalog}], limit, offset})
        }else {
            products = await Product.findAndCountAll({include:[{model:Subcategory}, {model:ImgForCatalog}], limit, offset})
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


    async newCategory(name){
        await Category.create({name})
        return await this.getSubcategories()
    }

    async newSubcategory(name, categoryId, typeId){
        const category = await Category.findOne({where:{id:categoryId}})
        if(!category){
            throw ApiError.badRequest("Категория не неайдена")
        }else {
            await Subcategory.create({name, categoryId, typeId})
        }

        return await this.getSubcategories()
    }

    async newProduct(req){
        const {name, price,subcategoryId, info, description} = req.body
        const {imgConstructor, imgsCatalog} = req.files

        let product = await Product.create({name, price, subcategoryId})






        let fileName = uuid.v4() + ".png"
        await imgConstructor.mv(path.resolve(__dirname, '..', 'static', 'constructor', fileName))
        await ImgForConstructor.create({productId:product.id, src:fileName})
        imgsCatalog.map(async img=>{
            fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', 'catalog', fileName))
            await ImgForCatalog.create({productId:product.id, src:fileName})
        })

        return  product
    }


}
module.exports = new CatalogService()