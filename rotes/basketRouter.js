const Router = require('express')
const router = new Router()
const basketController= require('../controllers/basketController')


router.get('/', basketController.getBasket)
router.post('/', basketController.addInBasket)
router.put('/', basketController.updateCountBasket)

module.exports = router