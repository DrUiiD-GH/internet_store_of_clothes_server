const Router = require('express')
const router = new Router()
const  constructorController = require('../controllers/constructorController')

router.get('/', constructorController.get)

module.exports = router