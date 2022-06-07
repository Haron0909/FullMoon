const uuid=require('uuid')
const path =require('path')
const {Product,Product_Info}= require('../models/models')
const ApiError= require('../error/ApiError')

class ProductController{
    async Create(req,res,next){
        try{
            let {name,price,TypeId,info}=req.body
            const {img}=req.files
            let fileName=uuid.v4()+".jpg"
            await img.mv(path.resolve(__dirname, '..','static',fileName))
            const product = await Product.create({name, price, img: fileName, TypeId})

            if(info){
                info=JSON.parse(info)
                info.forEach(i=>
                    Product_Info.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }


            return res.json(product)

        }catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req,res){

        const {typeId}=req.query
        let products
        if(!typeId){
            products = await Product.findAll()
        }
        if(typeId){
            products = await Product.findAll({where:{typeId}})
        }
        return res.json(products)
    }
    async getOne(req,res){

        const {id}=req.params
        const product = await Product.findOne({
            where: {id},
            include:[{model:Product_Info,as:'info'}]
        })
        return res.json(product)
    }

}

module.exports = new ProductController()