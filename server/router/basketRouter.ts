import { Router } from 'express'
import BasketController from '../controllers/BasketController'
import roleMiddleware from '../middleware/roleMiddleware'
const router = Router()

router.post('/add', BasketController.add)
router.get('/', BasketController.getAll)
router.delete('/', BasketController.delete) //refactor only admin can delete!
router.post('/newCount', BasketController.changeCount)

export default router
