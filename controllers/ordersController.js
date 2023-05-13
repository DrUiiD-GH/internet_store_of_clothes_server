const ordersService = require('../service/ordersService')

class OrdersController{
    async getOrders(req, res, next){
        try {
            const orders = await ordersService.getAllOrders(req.user.id)
            return res.json(orders)
        }catch (e){
            next(e)
        }
    }

    async getOneOrder(req, res, next){
        try {
            const {id} = req.params
            const order = await ordersService.getOneOrder(id)
            return res.json(order)
        }catch (e){
            next(e)
        }
    }

    async addOrder(req, res, next){
        try {
            const orders = await ordersService.createNewOrder(req.user.id)
            return res.json(orders)
        }catch (e){
            next(e)
        }

    }

    async removeOrder(req, res, next){
        try {
            const orders = await ordersService.cancelOrder(req.body.orderId, req.user.id)
            return res.json(orders)
        }catch (e){
            next(e)
        }

    }

}

module.exports = new OrdersController()