import { User } from "@models/user"
import { Request, Response } from 'express'
import { Op } from "sequelize"

const sendResetEmail = async (request: Request, response: Response) => {
	const { login } = request.body

	if(!login){
		return response.status(401).json({
			message: 'Invalid email/login!'
		})
	}

	const userToRecover = await User.findOne({
		where: {
			[Op.or]: [
				{
					login
				},
				{
					email: login
				}
			]
		}
	})

	if(!userToRecover){
		return response.status(404).json({
			message: 'User not found!'
		})
	}

	
}