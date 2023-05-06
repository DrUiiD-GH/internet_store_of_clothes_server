const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email:{type:DataTypes.STRING, unique:true, allowNull:false},
    password:{type:DataTypes.STRING, allowNull: false},
    name:{type:DataTypes.STRING},
    phoneNumber:{type:DataTypes.STRING},
    address:{type:DataTypes.STRING}
})

const Basket = sequelize.define('basket', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    total_cost:{type:DataTypes.INTEGER, defaultValue:0}
})

const ProductBasket = sequelize.define('product_basket', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    count:{type:DataTypes.INTEGER, defaultValue: 1}
})

const Order = sequelize.define('order', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    total_cost:{type:DataTypes.INTEGER, defaultValue:0},
    status:{type:DataTypes.STRING, defaultValue:'Создан'}
})

const ProductOrder = sequelize.define('product_order', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    count:{type:DataTypes.INTEGER, defaultValue: 1}
})

const Product = sequelize.define('product', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull:false},
    price:{type:DataTypes.INTEGER, allowNull:false}
})

const ProductInfo = sequelize.define('product_info', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false}
})

const ProductDescription = sequelize.define('product_description', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    description:{type:DataTypes.STRING, allowNull:false}
})

const Category = sequelize.define('category', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull:false},
})

const Subcategory = sequelize.define('subcategory', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull:false},
})

const Type = sequelize.define('type', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull:false},
})

const ImgForCatalog = sequelize.define('img_for_catalog', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    src:{type:DataTypes.STRING, allowNull:false}
})

const ImgForConstructor = sequelize.define('img_for_constructor', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    src:{type:DataTypes.STRING, allowNull:false}
})



//User
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)


//Basket
Basket.hasMany(ProductBasket)
ProductBasket.belongsTo(Basket)

Product.hasMany(ProductBasket)
ProductBasket.belongsTo(Product)

//Order
Order.hasMany(ProductOrder)
ProductOrder.belongsTo(Order)

Product.hasMany(ProductOrder)
ProductOrder.belongsTo(Product)

//Product
Product.hasMany(ImgForCatalog)
ImgForCatalog.belongsTo(Product)

Product.hasOne(ImgForConstructor)
ImgForConstructor.belongsTo(Product)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Product.hasOne(ProductDescription)
ProductDescription.belongsTo(Product)

Subcategory.hasMany(Product)
Product.belongsTo(Subcategory)

Category.hasMany(Subcategory)
Subcategory.belongsTo(Category)

Type.hasMany(Subcategory)
Subcategory.belongsTo(Type)



module.exports = {
    User,
    Basket,
    ProductBasket,
    Order,
    ProductOrder,
    Product,
    ImgForCatalog,
    ImgForConstructor,
    ProductInfo,
    ProductDescription,
    Subcategory,
    Category,
    Type
}

