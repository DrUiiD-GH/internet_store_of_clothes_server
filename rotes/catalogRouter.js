const Router = require('express')
const router = new Router()
const catalogController= require('../controllers/catalogController')



router.get('/categories', catalogController.getAllCategories)
router.get('/subcategories', catalogController.getAllSubcategories)
router.get('/products', catalogController.getAllProducts)
router.get('/products/:id', catalogController.getOneProduct)

router.post('/categories', catalogController.createCategory)
router.post('/subcategories', catalogController.createSubcategory)
router.post('/products', catalogController.createProduct)


module.exports = router