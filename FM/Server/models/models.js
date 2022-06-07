const sequelize =require('../db')
const {DataTypes} =require('sequelize')

const User = sequelize.define('User',{
    id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true },
    email:{type:DataTypes.STRING,unique: true},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING,defaultValue:"USER"},
})

const Basket = sequelize.define('Basket',{
    id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true },
})

const Basket_Product = sequelize.define('Basket_Product',{
    id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true },
})

const Product = sequelize.define('Product',{
    id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true },
    name:{type:DataTypes.STRING,unique: true,allowNull:false},
    price: {type:DataTypes.INTEGER,allowNull:false},
    img:{type:DataTypes.STRING,allowNull:false},
})

const Type = sequelize.define('Type',{
    id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true },
    name:{type:DataTypes.STRING,unique: true,allowNull:false},
})
const Product_Info = sequelize.define('Product_Info',{
    id: {type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true },
    title:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(Basket_Product)
Basket_Product.belongsTo(Basket)

Basket_Product.hasOne(Product)
Product.belongsTo(Basket_Product)

Product.hasMany(Product_Info,{as:'info'})
Product_Info.belongsTo(Product)

Type.hasMany(Product)
Product.belongsTo(Type)

module.exports = {
    User,
    Basket,
    Basket_Product,
    Product,
    Product_Info,
    Type
}