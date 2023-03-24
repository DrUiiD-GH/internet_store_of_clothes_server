const basketService = require('../service/basketService')

class BasketController{
    async getBasket(req, res){
        const basket = await basketService.getBasket(req.user.id)
        return res.json(basket)
    }

    async addInBasket(req, res){
        const {productId} = req.body
        const basket = await basketService.addInBasket(productId, req.user.id)
        return res.json(basket)
    }

    async updateCountBasket(req, res){
        const {productId, count} = req.body
        const basket = await basketService.updateCountBasket(productId, count, req.user.id)
        return res.json(basket)
    }
    async clearBasket(req, res){
        const basket = await basketService.clearBasket(req.user.id)
        return res.json(basket)
    }
}
module.exports = new BasketController()