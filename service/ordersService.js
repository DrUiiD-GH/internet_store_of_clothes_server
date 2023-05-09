const {Order, ProductOrder, Basket, ProductBasket} = require("../models/models");
const basketService = require('./basketService')
const ApiError = require("../error/ApiError");

class OrdersService{
    async getAllOrders(userId){
        return await Order.findAll({
            where: {userId}
        })
    }

    async createNewOrder(userId){
        const basket = await Basket.findOne({
            where:{userId},
            include:[{model:ProductBasket}]
        })

        if(!basket.product_baskets[0]) {
            throw ApiError.badRequest('В корзине пусто')
        }
        const order = await Order.create({total_cost:basket.total_cost, userId})
        basket.product_baskets.map(async product=>{
            await ProductOrder.create({
                count:product.count,
                orderId:order.id,
                productId:product.productId
            })
        })

        basketService.clearBasket(userId)

        return await this.getAllOrders(userId)
    }

    async cancelOrder(id, userId){
        let order = await Order.findOne({where:{id}})
        if(!order) throw ApiError.badRequest('Заказ не найден')
        await ProductOrder.destroy({where:{orderId:order.id}})
        await Order.destroy({where:{id}})
        return await this.getAllOrders(userId)
    }
}

module.exports = new OrdersService()