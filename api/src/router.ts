import { SessionController } from '@controllers/SessionController'
import { UserController } from '@controllers/UserController'
import { Router } from 'express'
import { activateUser } from 'services/activateUser.service'

const router = Router()

router.get('/api/user', UserController.index)
router.post('/api/user', UserController.store)
router.get('/api/user/confirmation/:token', activateUser)
router.post('/api/login', SessionController.store)

export { router }