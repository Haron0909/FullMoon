const Router = require('express')
const router =Router()
const productController=require('../controllers/productController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),productController.Create)
router.get('/',productController.getAll)
router.get('/:id',productController.getOne)

module.exports = router