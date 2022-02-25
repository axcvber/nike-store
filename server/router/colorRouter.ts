import { Router } from 'express'
import ColorController from '../controllers/ColorController'
import roleMiddleware from '../middleware/roleMiddleware'
const router = Router()

router.post('/', ColorController.create) //refactor only admin can create!
router.get('/', ColorController.getAll)
router.delete('/', ColorController.delete) //refactor only admin can delete!

export default router
