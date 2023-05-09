const ProductsDto = require('../dtos/products-dto')

const {Category, Subcategory, Product, ImgForCatalog, ProductInfo, ImgForConstructor, ProductDescription} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid")
const path = require('path')
const OneProductsDto = require("../dtos/oneProduct-dto");


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
        limit = limit ||1000
        let offset = (page-1)*limit
        let products
        if (subcategoryId) {
            products = await Product.findAndCountAll({
                where: {subcategoryId}, include: [{model: ImgForCatalog}, {model: Subcategory}], order:['id'], limit, offset
            })
        } else if (categoryId) {
            products = await Product.findAndCountAll({
                include: [{
                    model: Subcategory, where: {categoryId}
                }, {model: ImgForCatalog}], order:['id'], limit, offset
            })
        } else {
            products = await Product.findAndCountAll({
                include: [{model: Subcategory}, {model: ImgForCatalog}], order:['id'], limit, offset
            })
        }

       return new ProductsDto({...products})
    }

    async getOneProduct(id){
        let product =  await Product.findOne(
                {
                    where: {id},
                    include: [{model:Subcategory}, {model:ProductDescription}, {model: ProductInfo}, {model: ImgForCatalog}]
                })
        if(product){
            return new OneProductsDto({...product})
        }else {
            throw ApiError.badRequest("Товар не найден")
        }
    }


    async newCategory(name) {
        await Category.create({name})
        return await this.getSubcategories()
    }

    async newSubcategory(name, categoryId, typeId) {
        const category = await Category.findOne({where: {id: categoryId}})
        if (!category) {
            throw ApiError.badRequest("Категория не неайдена")
        } else {
            await Subcategory.create({name, categoryId, typeId})
        }

        return await this.getSubcategories()
    }

    async newProduct(req) {
        let {name, price, subcategoryId, info, description} = req.body
        const {imgConstructor, imgsCatalog} = req.files

        let product = await Product.create({name, price, subcategoryId})

        await ProductDescription.create({productId: product.id, description})

        if(info){
            info = JSON.parse(info)
            info.forEach(i=>{
                ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId:product.id
                })
            })
        }

        let fileName = uuid.v4() + ".png"
        await imgConstructor.mv(path.resolve(__dirname, '..', 'static', 'constructor', fileName))
        await ImgForConstructor.create({productId:product.id, src:fileName})


        if(imgsCatalog[0]){
            imgsCatalog.map(async img=>{

            })
        }else {
            const fileNameCat = uuid.v4() + ".jpg"
            await imgsCatalog.mv(path.resolve(__dirname, '..', 'static', 'catalog', fileNameCat))
            await ImgForCatalog.create({productId:product.id, src:fileNameCat})
        }


        return  product
    }


}
module.exports = new CatalogService()