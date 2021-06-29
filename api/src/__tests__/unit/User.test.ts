import { User, IUserInstance } from '@models/user'
import { factory } from '../factories'

describe('User', ()=>{

	beforeEach(async ()=>{
		await User.destroy({
			truncate: true,
			force: true
		})
	})


	it('It should create a user', async ()=>{
		const user = await factory.create('User')


		expect(user).toHaveProperty('id')
		expect(user).toHaveProperty('login')
		expect(user).toHaveProperty('password')
		expect(user).toHaveProperty('email')
		expect(user).toHaveProperty('createdAt')
		expect(user).toHaveProperty('updatedAt')

	})

	it('should return a user array', async ()=>{

		const user: IUserInstance = await factory.create('User')

		const users = await User.findAll()
		
		
		expect(users.length).toEqual(1)
		expect(users[0].getDataValue('login')).toEqual(user.getDataValue('login'))
		expect(users[0].getDataValue('email')).toEqual(user.getDataValue('email'))
		expect(users[0].getDataValue('password')).toEqual(user.getDataValue('password'))


	})

	
})
