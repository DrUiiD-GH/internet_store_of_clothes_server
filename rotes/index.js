const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

const basketRouter = require('./basketRouter')
const categoryRouter = require('./categoryRouter')
const constructorRouter = require('./constructorRouter')
const productRouter = require('./productRouter')
const subcategoryRouter = require('./subcategoryRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/basket',authMiddleware, basketRouter)
router.use('/category', categoryRouter)
router.use('/subcategory', subcategoryRouter)
router.use('/type', typeRouter)
router.use('/product', productRouter)
router.use('/constructor', constructorRouter)

module.exports = router