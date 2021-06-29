import { Request, Response } from 'express'
import { User } from '@models/user'

const UserController = {

	async index(request: Request, response: Response){

		const users = await User.findAll()

		return response.json(users)
		
	},

	async store(request: Request, response: Response) {
		const {
			login,
			password,
			email
		} = request.body

		try{
			const userCreated = await User.create({
				login,
				password,
				email
			})

			return response.json(userCreated)
		}
		catch(error){
			return response.status(500).json({
				message: `Error during user creation!`
			})
		}


	}

}


export {UserController}