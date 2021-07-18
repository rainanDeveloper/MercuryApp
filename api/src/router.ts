import { SessionController } from '@controllers/SessionController'
import { UserController } from '@controllers/UserController'
import { Router } from 'express'

const router = Router()

router.get('/api/user', UserController.index)
router.get('/api/user/:identifier', UserController.show)
router.post('/api/user', UserController.store)
router.post('/api/login', SessionController.store)

export { router }