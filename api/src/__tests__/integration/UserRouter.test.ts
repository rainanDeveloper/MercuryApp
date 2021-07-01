import request from 'supertest'
import { app } from '../../app'

import { User } from '@models/user'


describe("UserRoutes", () => {
	beforeEach(async ()=>{
		await User.destroy({
			truncate: true,
			force: true
		})
	})

	it('should create a user',async ()=>{
		
		const response = await request(app)
		.post('/api/user')
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

	it('should list users, including new user created', async ()=>{
		await request(app)
		.post('/api/user')
		.send({
			login: 'Login1',
			password: '123456',
			email: 'test1@test.example'
		})

		const response = await request(app)
		.get('/api/user')

		expect(response.status).toBe(200)
	})
})
