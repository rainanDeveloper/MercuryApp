import { ChatController } from '@controllers/ChatController'
import { MessageController } from '@controllers/MessageController'
import { SessionController } from '@controllers/SessionController'
import { UserController } from '@controllers/UserController'
import { Router } from 'express'
import { sendResetEmail } from 'services/passwordReset.service'
import { activateUser } from './services/activateUser.service'

const router = Router()

router.get('/api/user', UserController.index)
router.get('/api/user/:identifier', SessionController.validationMiddleware, UserController.show)
router.get('/api/messages', SessionController.validationMiddleware, MessageController.index)
router.get('/api/auth/info', SessionController.show)
router.get('/api/user/confirmation/:token', activateUser)
router.get('/api/chat/:id', SessionController.validationMiddleware, ChatController.show)
router.post('/api/user', UserController.store)
router.post('/api/login', SessionController.store)
router.post('/api/messages', SessionController.validationMiddleware, MessageController.store)
router.post('/api/chat', SessionController.validationMiddleware, ChatController.store)
router.post('/api/passwd/recoveryEmail', sendResetEmail)

export { router }