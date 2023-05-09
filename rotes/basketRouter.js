const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')


router.get('/', basketController.getBasket)
router.post('/', basketController.addInBasket)
router.put('/', basketController.updateCountBasket)
router.delete('/', basketController.clearBasket)

module.exports = router