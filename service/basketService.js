const {Basket, ProductBasket, Product, ImgForCatalog, Subcategory} = require("../models/models");


const findFullBasket = async (userId)=>{
    return await Basket.findOne(
        {
            where: {userId},
            include: {
                model: ProductBasket,
                include: {model: Product, include: [{model: ImgForCatalog}, {model: Subcategory}]}, order:['id']
            }
        }
    )
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


class BasketService{
    async getBasket(userId){
        return await findFullBasket(userId)
    }//ready

    async addInBasket(productId, userId){
        let basket = await findFullBasket(userId)
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
             await ProductBasket.create(
                {
                    basketId:basket.id,
                    productId
                })
        }
        basket = await updateBasket(userId)
        return basket
    }

    async updateCountBasket(productId, count, userId){
        let basket = await findFullBasket(userId)
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
        basket = await updateBasket(userId)
        return basket
    }

    async clearBasket(userId){
        let basket = await findFullBasket(userId)
        await ProductBasket.destroy({where:{basketId:basket.id}})
        basket = await updateBasket(userId)
        return basket
    }
}

module.exports = new BasketService()