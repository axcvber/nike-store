import { Request, Response, NextFunction } from 'express'
import { BasketDevice, Basket, ProductModel, Product, Image, Color, Price, Size } from '../models/models'
import TokenService from '../service/token-service'

const getCartPrice = function (cartItems) {
  let total = 0
  if (cartItems.length) {
    cartItems.forEach((item) => {
      total += item.quantity * item.product_model.price.currentPrice
    })
  }
  return total
}

const getCartItemsCount = function (cartItems) {
  var count = 0
  if (cartItems.length) {
    cartItems.forEach((item) => {
      count += item.quantity
    })
  }
  return count
}

class BasketController {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { sizeId, productModelId } = req.body
      const { refreshToken, cartId } = req.cookies

      if (refreshToken) {
        const user = TokenService.validateRefreshToken(refreshToken)
        const [basket, created]: any = await Basket.findOrCreate({
          where: { userId: user.id },
          defaults: {
            userId: user.id,
          },
        })
        if (created) {
          const basketItem = await BasketDevice.create({ basketId: basket.id, productModelId, quantity: 1 })
          return res.json({ basketItem })
        } else {
          const [basketItem, createdBasketItem]: any = await BasketDevice.findOrCreate({
            where: { productModelId },
            defaults: {
              basketId: basket.id,
              productModelId,
              quantity: 1,
            },
          })
          if (!createdBasketItem) {
            return res.send('Already added to cart')
          } else {
            return res.json({ basketItem })
          }
        }
      } else {
        if (cartId) {
          const [basketItem, createdBasketItem]: any = await BasketDevice.findOrCreate({
            where: { productModelId, sizeId },
            defaults: {
              basketId: cartId,
              productModelId,
              quantity: 1,
              sizeId,
            },
          })
          if (!createdBasketItem) {
            const newCount = await BasketDevice.increment('quantity', {
              by: 1,
              where: { basketId: cartId, productModelId, sizeId },
            })
            // return res.status(409).send('Cart item already exist')
          }

          const cartItems = await BasketDevice.findAll({
            where: { basketId: cartId },
            include: [
              {
                model: ProductModel,
                attributes: ['id', 'model'],
                include: [
                  {
                    model: Product,
                    attributes: ['id', 'title'],
                  },
                  {
                    model: Price,
                  },
                  {
                    model: Size,
                  },
                  {
                    model: Image,
                    // attributes: ['url'],
                  },
                  {
                    model: Color,
                    attributes: ['name', 'color'],
                  },
                ],
              },
            ],
          })

          return res.json({ cartItems, totalCount: getCartItemsCount(cartItems) })
        } else {
          const basket: any = await Basket.create({ userId: null })
          const basketItem = await BasketDevice.create({ basketId: basket.id, productModelId, quantity: 1 })
          res.cookie('cartId', basket.id, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax',
          })
          return res.send('cartItem added to cookie')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { refreshToken, cartId } = req.cookies
      if (refreshToken) {
        const userTokenData = TokenService.validateRefreshToken(refreshToken)
        const basket: any = await Basket.findOne({ where: { userId: userTokenData.id } })
        const basketProducts = await BasketDevice.findAll({
          where: { basketId: basket.id },
          attributes: [],

          include: [
            {
              model: ProductModel,
              attributes: ['id', 'model'],
              include: [
                {
                  model: Product,
                  attributes: ['id', 'title', 'price'],
                },
                {
                  model: Image,
                  // attributes: ['url'],
                },
                {
                  model: Color,
                  attributes: ['name', 'color'],
                },
              ],
            },
          ],
        })
        return res.json(basketProducts)
      }
      if (cartId) {
        const basketItems = await BasketDevice.findAll({
          where: { basketId: cartId },
          include: {
            model: ProductModel,
            include: [
              {
                model: Product,
              },
              {
                model: Image,
              },
              {
                model: Price,
              },
              {
                model: Size,
                // through: { where: { isAvailable: true } },
              },
              {
                model: Color,
              },
            ],
            order: [['id', 'DESC']],
          },
        })

        return res.json({
          basketItems,
          totalPrice: getCartPrice(basketItems),
          totalCount: getCartItemsCount(basketItems),
        })
      }

      return res.json({})
    } catch (err) {
      console.log(err)
    }
  }
  async delete(req: Request, res: Response) {
    const { productModelId, sizeId } = req.body
    const { refreshToken, cartId } = req.cookies
    console.log(productModelId)
    const cartItem = await BasketDevice.destroy({ where: { productModelId, basketId: cartId, sizeId } })
    const basketItems = await BasketDevice.findAll({
      where: { basketId: cartId },
      include: {
        model: ProductModel,
        include: [
          {
            model: Product,
          },
          {
            model: Image,
          },
          {
            model: Price,
          },
          {
            model: Size,
            through: { where: { isAvailable: true } },
          },
        ],
      },
      order: [['id', 'DESC']],
    })
    return res.json({ cartItem, totalPrice: getCartPrice(basketItems), totalCount: getCartItemsCount(basketItems) })
  }

  async changeCount(req: Request, res: Response) {
    const { quantity, productModelId, sizeId } = req.body
    const { refreshToken, cartId } = req.cookies
    const newCount = await BasketDevice.update(
      { quantity: quantity },
      { where: { basketId: cartId, productModelId, sizeId } }
    )
    const basketItems = await BasketDevice.findAll({
      where: { basketId: cartId },
      include: {
        model: ProductModel,
        include: [
          {
            model: Product,
          },
          {
            model: Image,
          },
          {
            model: Price,
          },
          {
            model: Size,
            through: { where: { isAvailable: true } },
          },
        ],
        order: [['id', 'DESC']],
      },
    })
    return res.json({
      cartItems: basketItems,
      totalPrice: getCartPrice(basketItems),
      totalCount: getCartItemsCount(basketItems),
    })
  }
}

export default new BasketController()
