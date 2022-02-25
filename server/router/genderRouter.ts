import { Router } from 'express'
import GenderController from '../controllers/GenderController'
import roleMiddleware from '../middleware/roleMiddleware'
const router = Router()

router.post('/', GenderController.create) //refactor only admin can create!
router.get('/', GenderController.getAll)
router.delete('/', GenderController.delete) //refactor only admin can delete!

export default router
