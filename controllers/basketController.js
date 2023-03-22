const {Basket, ProductBasket} = require("../models/models");


class BasketController{
    async getBasket(req, res){
        const basket = await Basket.findOne({
            where:{userId:req.user.id},
            include:[{model:ProductBasket, as: 'product_baskets'}]})
        return res.json(basket)
    }
    async addInBasket(req, res){
        const {productId} = req.body
        const basket = await Basket.findOne({
            where:{userId:req.user.id}})
        let position = await ProductBasket.findOne({where: {
                    basketId:basket.id,
                    productId
                }})
        if(position){
            position = await ProductBasket.update({
                    count:position.count+1
                },{where:
                        {
                            basketId:basket.id,
                            productId
                        }})
        }else {
            position = await ProductBasket.create(
                {
                    basketId:basket.id,
                    productId
                })
        }


    }
    async updateBasket(req, res){}
}
module.exports = new BasketController()