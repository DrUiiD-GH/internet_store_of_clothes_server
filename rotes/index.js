const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

const basketRouter = require('./basketRouter')
const constructorRouter = require('./constructorRouter')
const catalogRouter = require('./catalogRouter')
const userRouter = require('./userRouter')
const ordersRouter = require('./ordersRouter')


router.use('/user', userRouter)
router.use('/basket',authMiddleware, basketRouter)
router.use('/catalog', catalogRouter)
router.use('/constructor', constructorRouter)
router.use('/orders',authMiddleware, ordersRouter)


module.exports = router