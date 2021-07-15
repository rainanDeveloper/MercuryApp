import { Request, Response } from 'express'
import { User } from '@models/user'
import { sequelize } from '@models/index'
import { JWToken } from '../utils/JWToken'

const SessionController = {
	async store(request: Request, response: Response){
		const { login, password } = request.body

		if(!login){
			return response.status(400).json({
				message: `Required login/password fields weren't fullfilled`
			})
		}

		if(!password){
			return response.status(400).json({
				message: `Required login/password fields weren't fullfilled`
			})
		}

		try {
			const user = await User.findOne({
				where: {
					login
				}
			})

			if(!user){
				return response.status(401).json({
					message: `Incorrect login or password!`
				})
			}

			if(!(await user.validatePassword(password))){
				return response.status(401).json({
					message: `Incorrect login or password!`
				})
			}

			const token = new JWToken({}).createToken({login: user.login, email: user.email})

			if(token){
				return response.json({
					token,
					data: {
						login: user.login,
						email: user.email
					}
				})
			}
			else{
				return response.status(500).json({
					message: `Error while trying to autenticate user!`
				})
			}
		}
		catch(error){
			return response.status(500).json({
				message: `Error while trying to autenticate user!`
			})
		}
	}
}


export { SessionController }