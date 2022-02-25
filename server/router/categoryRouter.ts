import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'
import roleMiddleware from '../middleware/roleMiddleware'
const router = Router()

router.post('/', CategoryController.create)
router.get('/', CategoryController.getAll)
router.delete('/', CategoryController.delete) //refactor only admin can delete!

router.get('/:url', CategoryController.test)

export default router
