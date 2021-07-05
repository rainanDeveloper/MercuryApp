import request from 'supertest'
import { app } from '../../app'

import { User } from '@models/user'


describe('Authentication routes', ()=>{
	beforeEach(async ()=>{
		await User.destroy({
			truncate: true,
			force: true
		})
	})
})