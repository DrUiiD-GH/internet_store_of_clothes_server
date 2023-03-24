const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

const basketRouter = require('./basketRouter')
const constructorRouter = require('./constructorRouter')
const catalogRouter = require('./catalogRouter')
const userRouter = require('./userRouter')


router.use('/user', userRouter)
router.use('/basket',authMiddleware, basketRouter)
router.use('/catalog', catalogRouter)
router.use('/constructor', constructorRouter)


module.exports = router