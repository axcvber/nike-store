import { Request, Response, NextFunction } from 'express'
import {
  Category,
  Color,
  Image,
  Product,
  ProductBenefits,
  ProductDetails,
  ProductInfo,
  ProductModel,
  ProductModelSize,
  Size,
  Gallery,
  ProductModelColor,
  Price,
  Gender,
} from '../models/models'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import ApiError from '../exceptions/api-error'
import { Op, Sequelize } from 'sequelize'

class ProductController {
  async create(req: Request & { files: any }, res: Response, next: NextFunction) {
    try {
      let { title, genderId, subtitle, categories, info, benefits, details, models } = req.body
      // const { images } = req.files
      // console.log('images', images)
      console.log('body', req.body)

      const product: any = await Product.create(
        {
          title,
          subtitle,
          url: title.replace(/ /g, '-').toLowerCase(),
          productGenderId: genderId,
          // models,
          // genderId,
          // category: categories,
          // info,
        }
        // {
        //   include: [
        //     {
        //       model: ProductModel,
        //       as: 'models',
        //       include: [
        //         {
        //           model: Image,
        //         },
        //         {
        //           model: Gallery,
        //           as: 'gallery',
        //         },
        //         {
        //           model: Size,
        //         },
        //         {
        //           model: Color,
        //           through: {
        //             attributes: [],
        //           },
        //         },
        //       ],
        //     },
        //     {
        //       model: Category,
        //       as: 'categories',
        //     },
        //   ],
        // }
      )

      models.forEach(async (model) => {
        const modelInstance = await product.createModel(model)
        await modelInstance.createImage(model.image)
        await modelInstance.createPrice(model.price)

        model.gallery.forEach(async (image) => {
          await modelInstance.createGallery(image)
        })
        await modelInstance.addColors(model.colors)
        await modelInstance.addSizes(model.sizes)
      })

      await product.addCategories(categories)
      // await product.addGender(gender)
      const productInfo = await product.createInfo(info)
      console.log('LOG', info)
      benefits.forEach(async (element) => {
        await productInfo.createBenefit(element)
      })
      details.forEach(async (element) => {
        await productInfo.createDetail(element)
      })

      // if (models) {
      //   models = JSON.parse(models)
      //   models.forEach(async (i) => {
      //     const productModel: any = await ProductModel.create({
      //       model: i.model,
      //       colorId: i.color,
      //       productId: product.id,
      //     })
      //     //refactor with one item
      //     images.forEach((image) => {
      //       if (image.name === i.model) {
      //         let fileName = uuidv4() + '.jpg'
      //         image.mv(path.resolve(__dirname, '..', 'static', fileName))
      //         Image.create({
      //           url: fileName,
      //           productModelId: productModel.id,
      //         })
      //       }
      //     })
      //   })
      // }

      // await product.addColor(1)
      // await ProductVariant.create({
      //   title: 'Nike Air Max Plus (Black)',
      //   images: fileName,
      //   color: 'black',
      //   price: 270,
      //   model: '604133-050',
      //   productId: 2,
      // })

      // if (variant) {
      //   variant = JSON.parse(variant)
      //   variant.forEach((i) =>
      //     ProductVariant.create({
      //       title: i.title,
      //       color: i.color,
      //       productId: product.id,
      //     })
      //   )
      // }

      return res.json({ message: 'ok' })
    } catch (e) {
      next(ApiError.BadRequest(e.message))
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let { cat, price, gender, color, sortBy, size, pageSize, page } = req.query as any
      // const { cat, price, gender, color } = req.query.params as any

      console.log('req.cat', cat)
      console.log('req.price', price)
      console.log('req.gender', gender)
      console.log('req.color', color)
      console.log('req.sortBy', sortBy)
      console.log('req.size', size)
      console.log('req.page', page)

      // const limit: number = Number(page) || 1
      // const size: number = Number(pageLimit) || 10
      // const offset = limit * size - size

      const getPagination = (page, size) => {
        // const limit = size ? +size : 5
        // const offset = page ? page * limit : 0
        page = page || 1
        const limit = size || 10
        const offset = page * limit - limit

        return { limit, offset }
      }

      const getPagingData = (data, page, limit) => {
        const { count: totalCount, rows: products } = data
        const currentPage = page ? +page : 1
        const totalPages = Math.ceil(totalCount / limit)

        return { totalCount, products, totalPages, currentPage }
      }

      const { limit, offset } = getPagination(page, pageSize)
      // page = page || 1
      // pageLimit = pageLimit || 10
      // let offset = page * pageLimit - pageLimit

      const filter: any = {
        cat: {},
        price: {},
        gender: {},
        color: {},
        size: {},
        sortBy: ['createdAt', 'DESC'],
      }

      // if (cat) {
      //   filter.cat.slug = cat
      // }
      // if (price) {
      //   filter.price.currentPrice = { [Op.between]: price }
      // }

      // if (gender) {
      //   filter.gender.slug = gender
      // }

      // if (color) {
      //   filter.color.id = color
      // }
      // if (size) {
      //   filter.size.size = size
      // }

      if (sortBy) {
        switch (sortBy) {
          case 'DESC':
            filter.sortBy = ['createdAt', 'DESC']
            break
          case 'ASC':
            filter.sortBy = ['createdAt', 'ASC']
            break
          case 'priceDesc':
            filter.sortBy = ['models', 'price', 'currentPrice', 'DESC']
            break
          case 'priceAsc':
            filter.sortBy = ['models', 'price', 'currentPrice', 'ASC']
          default:
            break
        }
      }

      // let where2 = {}
      // if (color) {
      //   where2 = { ...where2, '$models.colors.id$': { [Op.in]: [color] } }
      // }

      // if (cat) {
      //   where2 = { ...where2, '$categories.slug$': { [Op.eq]: cat } }
      // }
      // if (price) {
      //   where2 = { ...where2, '$models.price.currentPrice$': { [Op.between]: price } }
      // }
      // if (gender) {
      //   where2 = { ...where2, '$product_gender.slug$': { [Op.in]: gender } }
      // }

      let products = await Product.findAndCountAll({
        distinct: true,
        // subQuery: false,
        // where: { '$models.price.currentPrice$': { [Op.between]: [0, 50000] } },
        limit,
        offset,
        // where: where2,
        // where: {
        //   // '$models.colors.id$': 1,
        //   //@ts-ignore
        //   // '$categories.slug$': { [Op.eq]:  },
        //   '$models.colors.id$': { [Op.in]: [color] },
        // },
        include: [
          {
            model: ProductModel,
            as: 'models',
            required: true,

            // separate: true,
            // separate: true,
            include: [
              {
                model: Price,
                attributes: { exclude: ['createdAt', 'updatedAt', 'productModelId'] },
                where: price
                  ? {
                      currentPrice: price,
                    }
                  : null,
              },
              {
                model: Color,
                where: color
                  ? {
                      id: color,
                    }
                  : null,
              },

              {
                model: Size,
                where: size
                  ? {
                      id: size,
                    }
                  : null,
              },

              {
                model: Image,
                attributes: ['portraitURL', 'squarishURL'],
              },
            ],
          },
          {
            model: Category,
            as: 'categories',
            where: cat
              ? {
                  slug: cat,
                }
              : null,
          },
          {
            model: Gender,
            where: gender
              ? {
                  slug: gender,
                }
              : null,
          },
        ],
        order: [filter.sortBy],
      })

      // where: {
      //   // '$models.colors.id$': { [Op.in]: [3] },
      //   // '$models.price.currentPrice$': { [Op.between]: [0, 5000] },
      //   // '$categories.slug$': { [Op.eq]: 'lifestyle' },
      // },
      // if (typeId && !categoryId && !colorway && !sortBy) {
      //   //@ts-ignore
      //   products = await Product.findAndCountAll({ where: { typeId }, limit: pageLimit, offset })
      // }

      // if (!typeId && categoryId && !sortBy && !colorway) {
      //   //@ts-ignore
      //   products = await Product.findAndCountAll({ where: { categoryId }, limit: pageLimit, offset })
      // }
      // if (typeId && categoryId && !sortBy && !colorway) {
      //   //@ts-ignore
      //   products = await Product.findAndCountAll({ where: { typeId, categoryId }, limit: pageLimit, offset })
      // }
      // if (!typeId && !categoryId && !sortBy && colorway) {
      //   products = await Product.findAndCountAll({
      //     // limit: pageLimit,
      //     // offset,
      //     where: {
      //       //@ts-ignore
      //       '$model.color$': { [Op.eq]: colorway },
      //     },
      //     include: [
      //       {
      //         model: ProductModel,
      //         as: 'model',
      //         // limit: 4,
      //         // order: [['createdAt', 'DESC']],
      //         // attributes: [],
      //         // required: false,
      //       },
      //     ],
      //   })
      // }
      // if (!typeId && !categoryId && !colorway && sortBy) {
      //   console.log(sortBy)
      //   switch (sortBy) {
      //     case 'DESC':
      //       products = await Product.findAndCountAll({
      //         order: [['createdAt', 'DESC']],
      //         // where: {
      //         //   '$variant.createdAt$': { [Op.eq]: sortBy },
      //         // },
      //         include: [
      //           {
      //             model: ProductModel,
      //             as: 'model',
      //           },
      //         ],
      //       })
      //       break
      //     case 'priceDesc':
      //       products = await Product.findAndCountAll({
      //         order: Sequelize.literal('max(variant.price) DESC'),
      //         // order: [['variant.price', 'DESC']],
      //         // distinct: false,
      //         include: [
      //           {
      //             model: ProductModel,
      //             as: 'model',
      //           },
      //         ],
      //         group: ['product.id', 'model.id'],
      //       })
      //       break

      //     case 'priceAsc':
      //       products = await Product.findAndCountAll({
      //         order: Sequelize.literal('max(variant.price) ASC'),
      //         // order: [['variant.price', 'DESC']],
      //         distinct: true,
      //         include: [
      //           {
      //             model: ProductModel,
      //             as: 'model',
      //           },
      //         ],
      //         group: ['product.id', 'model.id'],
      //       })
      //       break

      //     default:
      //       break
      //   }
      // }

      const categories = await Category.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        // through: { attributes: [] },
      })

      const genders = await Gender.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        // through: { attributes: [] },
      })

      const colors = await Color.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        // through: { attributes: [] },
      })

      const sizes = await Size.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        // through: { attributes: [] },
      })

      // const testFilterList = await Product.findAll({
      //   attributes: [],
      //   // where: gender,
      //   include: [
      //     {
      //       model: ProductModel,
      //       as: 'models',
      //       include: [
      //         {
      //           model: Color,
      //           where: options,
      //           attributes: { exclude: ['createdAt', 'updatedAt'] },
      //           through: { attributes: [] },
      //         },
      //         {
      //           model: Size,
      //           // where: options,
      //           through: { attributes: [] },
      //         },
      //       ],
      //     },
      //     {
      //       model: Category,
      //       as: 'categories',
      //       where: options2,
      //       attributes: { exclude: ['createdAt', 'updatedAt'] },
      //       through: { attributes: [] },
      //     },
      //     {
      //       model: Gender,
      //       where: gender,
      //       attributes: { exclude: ['createdAt', 'updatedAt'] },
      //     },
      //   ],
      // })

      // let colors2 = []
      // let categories2 = []
      // let sizes2 = []
      // let gender2 = []

      // testFilterList.forEach((item: any) => {
      //   for (const model of item.models) {
      //     for (const color of model.colors) {
      //       colors2.push(color)
      //     }
      //     for (const size of model.sizes) {
      //       sizes2.push(size)
      //     }
      //   }
      //   for (const category of item.categories) {
      //     categories2.push(category)
      //   }
      //   gender2.push(item.product_gender)
      // })

      // const filteredSizes = sizes2.reduce((acc, current) => {
      //   const x = acc.find((item) => item.id === current.id)
      //   if (!x) {
      //     return acc.concat([current])
      //   } else {
      //     return acc
      //   }
      // }, [])

      // const filteredCats = categories2.reduce((acc, current) => {
      //   const x = acc.find((item) => item.id === current.id)
      //   if (!x) {
      //     return acc.concat([current])
      //   } else {
      //     return acc
      //   }
      // }, [])

      // const filteredColors = colors2.reduce((acc, current) => {
      //   const x = acc.find((item) => item.id === current.id)
      //   if (!x) {
      //     return acc.concat([current])
      //   } else {
      //     return acc
      //   }
      // }, [])

      const response = getPagingData(products, page, limit)

      return res.json({
        ...response,
        filterList: { categories, genders, colors, sizes },
      })
    } catch (err) {
      console.log(err)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { url, model } = req.params

    const product: any = await Product.findOne({
      where: { url },
      include: [
        {
          model: Category,
          as: 'categories',
        },
        {
          model: ProductInfo,
          as: 'Info',
          include: [
            {
              model: ProductBenefits,
              as: 'Benefit',
            },
            {
              model: ProductDetails,
              as: 'Detail',
            },
          ],
        },
      ],
    })
    if (!product) {
      return res.sendStatus(404)
    }
    if (!model) {
      const productModel = await ProductModel.findOne({
        where: { productId: product.id },
        limit: 1,
        include: [
          {
            model: Gallery,
            as: 'gallery',
          },
          {
            model: Size,
            attributes: ['id', 'size'],
            through: { attributes: ['isAvailable'] },
          },
          {
            model: Color,
          },
        ],

        order: [
          [Size, 'id', 'ASC'],
          ['gallery', 'id', 'ASC'],
        ],
      })
      return res.json({ product, productModel })
    } else {
      const productModel = await ProductModel.findOne({
        where: { productId: product.id, model },
        include: [
          {
            model: Price,
            attributes: { exclude: ['createdAt', 'updatedAt', 'productModelId'] },
          },
          {
            model: Gallery,
            as: 'gallery',
            order: [['createdAt', 'ASC']],
          },
          {
            model: Size,
            attributes: ['id', 'size'],
            through: { attributes: ['isAvailable'] },
          },
          {
            model: Color,
          },
        ],
        order: [
          [Size, 'id', 'ASC'],
          ['gallery', 'id', 'ASC'],
        ],
      })
      if (!productModel) {
        return res.sendStatus(404)
      }
      return res.json({ product, productModel })
    }
  }

  async getColorways(req: Request, res: Response, next: NextFunction) {
    const { url } = req.params
    console.log(url)
    const product: any = await Product.findOne({ where: { url } })
    const colorways = await ProductModel.findAll({
      where: { productId: product.id },
      attributes: ['id', 'model'],
      include: [
        {
          model: Image,
          attributes: ['id', 'squarishURL'],
        },
      ],
    })
    return res.json(colorways)
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    console.log(data)
    const products = await Product.destroy({ where: { id: data } })
    console.log('result', products)
    return res.json(products)
  }

  async test(req: Request, res: Response, next: NextFunction) {
    const products = await Product.findAndCountAll({
      distinct: true,
      subQuery: false,
      limit: 10,
      offset: 0,
      include: {
        // required: true,
        model: ProductModel,

        as: 'models',
        required: true,
        include: [
          {
            model: Price,
            where: { currentPrice: 1000 },
          },
          {
            model: Color,
            where: { id: 3 },
          },
        ],
      },
    })
    return res.json({ products })
  }
}

export default new ProductController()
