const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {body} = require('express-validator')

router.post('/registration',
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min:5, max:16}),
    userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.put('/edit',authMiddleware, userController.editInfo)
router.get('/info',authMiddleware, userController.getInfo)


module.exports = router