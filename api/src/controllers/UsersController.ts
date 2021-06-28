import { Request, Response } from 'express'
import { User } from '@models/user'

const UserController = {

	async index(request: Request, response: Response){

		const users = await User.findAll()

		return response.json(users)
		
	}

}


export {UserController}