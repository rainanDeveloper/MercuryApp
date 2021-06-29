import request from 'supertest'
import { app } from '../../app'

import { User, IUserInstance } from '@models/user'
import { factory } from '../factories'


describe("UserRoutes", () => {
	it('should create a user',async ()=>{
		const response = await request(app)
		.post('/user')
		.send({
			login: 'Login',
			password: '123456',
			email: 'test@test.example'
		})

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('id')
		expect(response.body).toHaveProperty('login')
		expect(response.body).toHaveProperty('password')
		expect(response.body).toHaveProperty('email')
		expect(response.body).toHaveProperty('createdAt')
		expect(response.body).toHaveProperty('updatedAt')
	})
})
