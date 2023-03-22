const {Basket, ProductBasket, Product, ImgForConstructor, ImgForCatalog} = require("../models/models");
const {where} = require("sequelize");

const findFullBasket = async (userId)=>{
    const basket = await Basket.findOne(
        {
            where: {userId},
            include: [{model:ProductBasket, as:'product_baskets', include:{model:Product, as:'product', include:{model:ImgForCatalog, as:'img_for_catalogs'}}}]
        }
    )
    return basket
}

const updateBasket = async (userId)=>{
    let basket = await findFullBasket(userId)
    let total_cost = 0
    basket.product_baskets.forEach( i=>{
        total_cost = total_cost + i.product.price * i.count
    })
    await Basket.update({total_cost}, {where:{id:basket.id}})
    basket = await findFullBasket(userId)
    return basket
}


class BasketController{
    async getBasket(req, res){
        const basket = await findFullBasket(req.user.id)
        return res.json(basket)
    }//ready

    async addInBasket(req, res){
        const {productId} = req.body
        let basket = await findFullBasket(req.user.id)
        let position = await ProductBasket.findOne({where: {
                    basketId:basket.id,
                    productId
                }})
        if(position){
             await ProductBasket.update({
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
        basket = await updateBasket(req.user.id)
        return res.json(basket)
    }
    async updateCountBasket(req, res){
        const {productId, count} = req.body
        let basket = await findFullBasket(req.user.id)
        let position = await ProductBasket.findOne({where: {
                basketId:basket.id,
                productId
            }})
        if(position){
            if(count<1){
                await ProductBasket.destroy({where:
                        {
                            basketId:basket.id,
                            productId
                        }})
            }else {
                await ProductBasket.update({
                    count:count
                },{where:
                        {
                            basketId:basket.id,
                            productId
                        }})
            }
        }
        basket = await updateBasket(req.user.id)
        return res.json(basket)
    }
}
module.exports = new BasketController()