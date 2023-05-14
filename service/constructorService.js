const {Product, ImgForConstructor, Subcategory, ImgForCatalog} = require("../models/models");
const ProductsForConstrictorDto = require('../dtos/productsForConstructor-dto')

class ConstructorService{
    async getProducts (categoryId, subcategoryId){
        let products
        if(subcategoryId){
            products = await Product.findAll({
                where:{subcategoryId},
                include: [
                    {model: Subcategory},
                    {model: ImgForConstructor},
                    {model: ImgForCatalog}
                ]})
        }else if(categoryId){
            products = await Product.findAll({
                include: [
                    {model: Subcategory, where:{categoryId}},
                    {model: ImgForConstructor},
                    {model: ImgForCatalog}
                ]})
        }else {
            products = await Product.findAll({
                include: [
                    {model: ImgForConstructor},
                    {model: Subcategory},
                    {model: ImgForCatalog}
                ]})
        }
        products = new ProductsForConstrictorDto({products})
        return products.products
    }
}

module.exports = new ConstructorService()