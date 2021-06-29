import { UserController } from '@controllers/UsersController'
import { Router } from 'express'

const router = Router()

router.get('/user', UserController.index)
router.post('/user', UserController.store)

export { router }