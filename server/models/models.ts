import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../core/db'

export interface UserInstance extends Model {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: any
  country: string
  gender: string
  subscribe: boolean
  isActivated?: boolean
  activationLink?: string
  role?: string
}

const User = sequelize.define<UserInstance>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  subscribe: { type: DataTypes.BOOLEAN },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

interface TokenInstance extends Model {
  id: number
  refreshToken: string
}

const Token = sequelize.define<TokenInstance>('token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, allowNull: false },
})

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, unique: true, allowNull: false },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
  subtitle: { type: DataTypes.STRING, allowNull: false },
  // gender: { type: DataTypes.STRING, allowNull: false },
})

const ProductInfo = sequelize.define('product_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING(500), allowNull: false },
})

const ProductBenefits = sequelize.define('product_benefits', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
})

const ProductDetails = sequelize.define('product_details', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
})

const Image = sequelize.define('image', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  portraitURL: { type: DataTypes.STRING, allowNull: false },
  squarishURL: { type: DataTypes.STRING, allowNull: false },
})

const Gallery = sequelize.define('gallery', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
})

const ProductModel = sequelize.define('product_model', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  model: { type: DataTypes.STRING, allowNull: false },
  inStock: { type: DataTypes.BOOLEAN, defaultValue: true },
  isNew: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const Gender = sequelize.define('product_gender', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  slug: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.STRING, unique: true, allowNull: false },
  slug: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Color = sequelize.define('color', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Size = sequelize.define('size', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  size: { type: DataTypes.INTEGER, allowNull: false },
  length: { type: DataTypes.DECIMAL, allowNull: false },
})

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevice = sequelize.define('basket_device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
})

const Price = sequelize.define('price', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  currency: { type: DataTypes.STRING, allowNull: false },
  currentPrice: { type: DataTypes.INTEGER, allowNull: false },
  discounted: { type: DataTypes.BOOLEAN, defaultValue: false },
  fullPrice: { type: DataTypes.INTEGER, allowNull: false },
})

const ProductCategory = sequelize.define(
  'product_category',
  {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
)

const ProductModelColor = sequelize.define(
  'product_model_color',
  {
    colorId: { type: DataTypes.INTEGER, allowNull: false },
    productModelId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
)

const ProductModelSize = sequelize.define(
  'product_model_size',
  {
    sizeId: { type: DataTypes.INTEGER, allowNull: false },
    productModelId: { type: DataTypes.INTEGER, allowNull: false },
    isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    timestamps: false,
  }
)

ProductModel.hasOne(Price)
Price.belongsTo(ProductModel)

ProductModel.belongsToMany(Size, { through: ProductModelSize })
Size.belongsToMany(ProductModel, { through: ProductModelSize })

ProductModel.belongsToMany(Color, { through: ProductModelColor })
Color.belongsToMany(ProductModel, { through: ProductModelColor })

// Product.belongsToMany(Category, { through: ProductCategory })

Product.hasMany(ProductModel, { as: 'models', onDelete: 'CASCADE' })
ProductModel.belongsTo(Product)

Product.belongsToMany(Category, { as: 'categories', through: ProductCategory, onDelete: 'CASCADE' })
Category.belongsToMany(Product, { through: ProductCategory })

Product.hasOne(ProductInfo, { as: 'Info', foreignKey: 'productId' })
ProductInfo.belongsTo(Product)

Gender.hasOne(Product)
Product.belongsTo(Gender)

ProductInfo.hasMany(ProductBenefits, { as: 'Benefit', foreignKey: 'productInfoId' })
ProductBenefits.belongsTo(ProductInfo)

ProductInfo.hasMany(ProductDetails, { as: 'Detail', foreignKey: 'productInfoId' })
ProductDetails.belongsTo(ProductInfo)

// Product.belongsToMany(Category, {
//   as: 'Category',
//   through: 'ProductCategory',
//   foreignKey: 'productId',
// })

// Category.belongsToMany(Product, {
//   as: 'Product',
//   through: 'ProductCategory',
//   foreignKey: 'categoryId',
// })

User.hasOne(Basket, { onDelete: 'CASCADE' })
Basket.belongsTo(User)

Basket.hasMany(BasketDevice, { onDelete: 'CASCADE' })
BasketDevice.belongsTo(Basket)

ProductModel.hasMany(BasketDevice)
BasketDevice.belongsTo(ProductModel)

Size.hasOne(BasketDevice)
BasketDevice.belongsTo(Size)

ProductModel.hasOne(Image)
Image.belongsTo(ProductModel)

ProductModel.hasMany(Gallery, { as: 'gallery' })
Gallery.belongsTo(ProductModel)

// ProductModel.hasMany(Size, { as: 'sizes' })
// Size.belongsTo(ProductModel)

// Color.hasOne(ProductModel)
// ProductModel.belongsTo(Color)

// Type.hasOne(Product)
// Product.belongsTo(Type)

// Category.hasOne(Product)
// Product.belongsTo(Category)

//new i am

// ProductModel.hasMany(Product, {
//   foreignKey: 'productModelID',
//   keyType: DataTypes.STRING,
//   constraints: false,
// })

// Product.belongsTo(ProductModel)

// Color.belongsToMany(Product, { foreignKey: 'ColorId', as: 'products', constraints: false, through: ProductColor })
// Product.belongsToMany(Color, { foreignKey: 'ProductId', as: 'colors', constraints: false, through: ProductColor })

User.hasOne(Token, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'cascade',
})
Token.belongsTo(User)

export {
  User,
  Product,
  ProductInfo,
  ProductBenefits,
  ProductDetails,
  Category,
  Token,
  Color,
  ProductModel,
  Basket,
  BasketDevice,
  Image,
  Size,
  ProductModelSize,
  ProductCategory,
  Gallery,
  ProductModelColor,
  Price,
  Gender,
}
