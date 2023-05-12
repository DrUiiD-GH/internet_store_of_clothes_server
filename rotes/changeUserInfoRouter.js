const {body} = require("express-validator");
const userController = require("../controllers/userController");
const Router = require("express");
const router = new Router()


router.put('/name', userController.editName)
router.put('/email',body('email', 'Не верный формат почты').isEmail(), userController.editEmail)
router.put('/password',
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min:5, max:16}),
    userController.editPassword)
router.put('/phone', userController.editPhone)
router.put('/address', userController.editAddress)

module.exports = router