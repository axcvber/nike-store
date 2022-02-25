import { Request, Response, NextFunction } from 'express'
import { Size } from '../models/models'

class SizeController {
  async create(req: Request, res: Response) {
    const { size, length } = req.body
    const createdSize = await Size.create({ size, length })
    return res.json(createdSize)
  }

  async getAll(req: Request, res: Response) {
    const sizes = await Size.findAll()
    return res.json(sizes)
  }

  async delete(req: Request, res: Response) {
    const data = req.body
    console.log('ARRAY', data)

    const colors = await Size.destroy({ where: { id: data } })
    return res.json(colors)
  }
}

export default new SizeController()
