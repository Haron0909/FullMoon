const Router = require('express')
const router =Router()
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')


router.use('/user',userRouter)
router.use('/product',productRouter)
router.use('/type',typeRouter)




module.exports = router