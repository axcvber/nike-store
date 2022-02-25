import { Router } from 'express'
import SizeController from '../controllers/SizeController'
import roleMiddleware from '../middleware/roleMiddleware'
const sizeRouter = Router()

sizeRouter.post('/', SizeController.create) //refactor only admin can create!
sizeRouter.get('/', SizeController.getAll)
sizeRouter.delete('/', SizeController.delete) //refactor only admin can delete!

export default sizeRouter
