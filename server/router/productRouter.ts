import { Router } from 'express'
import ProductController from '../controllers/productController'
const router = Router()

router.post('/', ProductController.create)
router.get('/:params?', ProductController.getAll)
// router.get('/find', ProductController.find)
router.get('/colorways/:url', ProductController.getColorways)
router.get('/getOne/:url/:model?', ProductController.getOne)

router.delete('/', ProductController.delete) //refactor only admin can delete!
// router.get('/test', ProductController.test)

export default router
