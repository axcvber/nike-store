import { Router } from 'express'
import userRouter from './userRouter'
import productRouter from './productRouter'
import genderRouter from './genderRouter'
import categoryRouter from './categoryRouter'
import colorRouter from './colorRouter'
import modelRouter from './modelRouter'
import basketRouter from './basketRouter'
import sizeRouter from './sizeRouter'

const router = Router()
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/gender', genderRouter)
router.use('/category', categoryRouter)
router.use('/color', colorRouter)
router.use('/model', modelRouter)
router.use('/basket', basketRouter)
router.use('/size', sizeRouter)

export default router
