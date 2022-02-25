import { Router } from 'express'
import UserController from '../controllers/UserController'
import authMiddleware from '../middleware/auth-middleware'
import { registerSchema } from '../validation/registerSchema'
import { loginSchema } from '../validation/loginSchema'
const router = Router()

router.post('/registration', registerSchema, UserController.registration)
router.post('/login', loginSchema, UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)

export default router
