import { MessageController } from '@controllers/MessageController'
import { SessionController } from '@controllers/SessionController'
import { UserController } from '@controllers/UserController'
import { Router } from 'express'
import { activateUser } from './services/activateUser.service'

const router = Router()

router.get('/api/user', UserController.index)
router.get('/api/user/:identifier', UserController.show)
router.get('/api/auth/info', SessionController.show)
router.get('/api/user/confirmation/:token', activateUser)
router.post('/api/user', UserController.store)
router.post('/api/login', SessionController.store)
router.post('/api/messages', SessionController.validationMiddleware, MessageController.store)

export { router }