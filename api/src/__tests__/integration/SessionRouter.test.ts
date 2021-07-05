import request from 'supertest'
import { app } from '../../app'
import { factory } from '../factories'

import { User } from '@models/user'


describe('Authentication routes', ()=>{
	beforeEach(async ()=>{
		await User.destroy({
			truncate: true,
			force: true
		})
	})

	it('Should authenticate user with valid credentials', async ()=>{
		const user = await factory.create('User', {
			login: 'testUser',
			password: '123456'
		})

		const response = await request(app)
		.post('/api/login')
		.send({
			login: user.login,
			password: '123456'
		})

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('token')
	})
})