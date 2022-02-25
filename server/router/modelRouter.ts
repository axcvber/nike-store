import { Router } from 'express'
import ModelController from '../controllers/ModelController'
const router = Router()

router.post('/', ModelController.create)
router.get('/:productId', ModelController.getAll)
router.delete('/', ModelController.delete) //refactor only admin can delete!

export default router
