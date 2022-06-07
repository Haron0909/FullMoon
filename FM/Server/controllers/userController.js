const ApiError = require('../error/ApiError')
const  bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Basket} = require ('../models/models')

const generateJWT = (id, email,role)=>{
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
    {expiresIn:'24h'}
    )
}


class UserController{
    async registration(req,res,next){
        const {email,password,role}=req.body
        if(!email || !password){
            return next(ApiError.badRequest('Неверный Email или пароль'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким Email существет'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user =await User.create({email,role,password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = await generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req,res,next){
        const {email,password}=req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.badRequest('Пользователь с таким Email не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internal('не верный пароль'))
        }
        const token = await generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJWT(req.user.id,req.user.email,req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()