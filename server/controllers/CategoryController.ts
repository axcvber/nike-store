import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import { Category, Product, ProductCategory } from '../models/models'

class CategoryController {
  async create(req: Request, res: Response) {
    const { category, slug } = req.body
    const createdCategory = await Category.create({ category, slug })
    return res.json(createdCategory)
  }

  async getAll(req: Request, res: Response) {
    const categories = await Category.findAll()
    return res.json(categories)
  }
  async delete(req: Request, res: Response) {
    const data = req.body
    console.log(data)
    const categories = await Category.destroy({ where: { id: data } })
    return res.json(categories)
  }

  async test(req: Request, res: Response) {
    const { url } = req.query
    const categories = await Category.findAll({
      where: {
        //@ts-ignore
        '$products.gender.gender$': { [Op.eq]: 'Мужчины' },
      },
      include: [
        {
          attributes: [],
          model: Product,
        },
      ],
    })
    return res.json(categories)
  }
}

export default new CategoryController()
