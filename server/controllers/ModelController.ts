import { Request, Response, NextFunction } from 'express'
import { Image, Product, ProductModel } from '../models/models'

class ModelController {
  async create(req: Request, res: Response) {}

  async getAll(req: Request, res: Response) {
    const { productId } = req.params

    const models = await ProductModel.findAll({
      where: { productId },
      include: [
        {
          model: Image,
          as: 'images',
        },
      ],
    })
    return res.json(models)
  }
  async delete(req: Request, res: Response) {}
}

export default new ModelController()
