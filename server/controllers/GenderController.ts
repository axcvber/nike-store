import { Request, Response, NextFunction } from 'express'
import { Gender } from '../models/models'

class TypeController {
  async create(req: Request, res: Response) {
    const { slug, name } = req.body
    const createdGender = await Gender.create({ slug, name })
    return res.json(createdGender)
  }

  async delete(req: Request, res: Response) {
    const data = req.body
    console.log(data)
    const genders = await Gender.destroy({ where: { id: data } })
    return res.json(genders)
  }

  async getAll(req: Request, res: Response) {
    const genders = await Gender.findAll()
    return res.json(genders)
  }
}

export default new TypeController()
