const Router = require("express");
const ordersController = require('../controllers/ordersController')

const router = new Router()

router.get('/', ordersController.getOrders)
router.get('/:id', ordersController.getOneOrder)
router.post('/', ordersController.addOrder)
router.delete('/', ordersController.removeOrder)


module.exports = router