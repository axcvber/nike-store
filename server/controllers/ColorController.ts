import { Request, Response, NextFunction } from 'express'
import { Color } from '../models/models'

class ColorController {
  async create(req: Request, res: Response) {
    const { color, colorName } = req.body
    const createdColor = await Color.create({ name: colorName, color })
    return res.json(createdColor)
  }

  async getAll(req: Request, res: Response) {
    const colors = await Color.findAll()
    return res.json(colors)
  }

  async delete(req: Request, res: Response) {
    const data = req.body
    console.log('ARRAY', data)

    const colors = await Color.destroy({ where: { id: data } })
    return res.json(colors)
  }
}

export default new ColorController()
