import { Request, Response } from 'express'
import { User } from '@models/user'
import { IMail, transporter } from 'services/nodemailer.service'

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

			// Creates a user

			const userCreated = await User.create({
				login,
				password,
				email
			})

			// If user is successfully created, sends an email to the user

			const message: IMail = {
				to: `${login} <${email}>`,
				from: 'MercuryApp <contact@mercuryapp.com>',
				subject: 'User account activation',
				text: 'Activate your account',
				html: '<p>Activate your account</p>'
			}

			await transporter.sendMail(message)

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