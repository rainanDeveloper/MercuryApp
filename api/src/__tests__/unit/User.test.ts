import { User, IUserInstance } from '@models/user'
import { factory } from '../factories'

describe('User', ()=>{
	test('It should create a user', async ()=>{
		const user = await factory.create('User', {
			email: 'test@test.example',
			password: '123456'
		})


		expect(user.email).toBe('test@test.example')
		expect(user.password).toBe('123456')

		await User.destroy({
			truncate: true
		})
	})

	it('should return a user array', async ()=>{

		const user: IUserInstance = await factory.create('User')

		const users = await User.findAll()
		
		
		expect(users.length).toEqual(1)
		expect(users[0].getDataValue('login')).toEqual(user.getDataValue('login'))
		expect(users[0].getDataValue('email')).toEqual(user.getDataValue('email'))
		expect(users[0].getDataValue('password')).toEqual(user.getDataValue('password'))

		await User.destroy({
			truncate: true
		})

	})

	
})
