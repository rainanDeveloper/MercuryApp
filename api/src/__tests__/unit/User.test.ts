import { User } from '@models/user'

describe('User', ()=>{
	test('It should return a user array', async ()=>{
		const users = await User.findAll()
	
		expect(typeof users).toBe('object')
	})
})
