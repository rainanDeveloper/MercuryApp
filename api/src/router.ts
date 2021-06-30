import { UserController } from '@controllers/UsersController'
import { Router } from 'express'

const router = Router()

router.get('/api/user', UserController.index)
router.post('/api/user', UserController.store)

export { router }