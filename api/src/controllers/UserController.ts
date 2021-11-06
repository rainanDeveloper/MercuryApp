import { Request, Response } from 'express'
import { User } from '@models/user'
import { IMail, transporter } from '../services/nodemailer.service'
import { sequelize } from '@models/index'
import { JWToken } from '../utils/JWToken'
import { Op } from 'sequelize'
import { UserChat } from '@models/user_chat'
import { Chat } from '@models/chat'

const UserController = {

	async index(request: Request, response: Response){

		const users = await User.findAll({
			attributes: ['id', 'login']
		})

		return response.json(users)
		
	},
	async store(request: Request, response: Response) {
		const {
			login,
			password,
			email,
			public_key
		} = request.body

		const transaction = await sequelize.transaction()

		try{

			// Creates a user

			const userCreated = await User.create({
				login,
				password,
				email,
				public_key
			}, {transaction})

			const newChat = await Chat.create({
				name: 'Notes to self'
			}, {transaction})
			

			const userChatRelation = await UserChat.create({
				userId: userCreated.id,
				chatId: newChat.id
			}, { transaction })

			
			// If user is successfully created, sends an email to the user
			
			// Create jwt token for confirmation
			
			const token = new JWToken({}).createToken({login, email})
			
			const link = `http://${request.host}/api/user/confirmation/${token}`
			
			// html content
			
			const html = `<!DOCTYPE html>
			<html>
			<head>
			<meta http-equiv="content-type" content="text/html; charset=utf-8" />
			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
			<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet"/>
			</head>
			<body style="padding: 0; margin: 0; width: 100%;">
			
			<table width="100%" height="100%" style="background-color:#cdd4df; padding: 0; margin: 0" cellpading="0" cellspacing="0">
			<tbody cellpading="0" cellspacing="0">
			<tr cellpading="0" cellspacing="0">
			<td align="center" cellpading="0" cellspacing="0">
			<table style="margin: 0 auto; background:#f5f6fa; font-family: 'Roboto', Arial, Helvetica, sans-serif;" width="512">
			<thead>
			<tr>
			<th><h1 style="font-weight: 300; padding: 10px; margin: 0; text-align: left;">Mercury App</h1></th>
			</tr>
			</thead>
			<tbody>
			<tr>
			<td style="padding: 10px;">
			Foi identificado um cadastro de usuário em nosso app. Caso não tenha sido você quem o tenha feito, ignore este email.
			Caso queira prossegui com a ativação da conta, clique no link abaixo:
			</td>
			</tr>
			<tr>
			<td style="padding: 10px;" align="center">
			<a href="${link}" style="text-decoration: none; border-radius: 5px; background: #0097e6; padding: 10px; color: white">Confirme sua inscrição</a>
			</td>
			</tr>
			</tbody>
			</table>
			</td>
			</tr>
			</tbody>
			</table>
			</body>
			</html>`
			
			const message: IMail = {
				to: `<${email}>`,
				from: `MercuryApp <${process.env.APPLICATION_MAIL}>`,
				subject: 'User account activation',
				text: 'Activate your account: ',
				html
			}
			
			await transporter.sendMail(message)

			// After successfully email sending, transaction is finally executed
			await transaction.commit()
			
			return response.json(userCreated)
		}
		catch(error){
			transaction.rollback()

			return response.status(500).json({
				message: `Error during user creation: ${error}`,
				error
			})
		}


	},
	async show(request: Request, response: Response){
		const {identifier} = request.params

		const {id: userId} = request['user']

		const user = await User.findOne({
			attributes: ['id', 'login'],
			where: {
				[Op.or]: [
					{
						login: identifier
					},
					{
						email: identifier
					}
				]
			}
		})

		if(user){
			if(user.id==userId){
				return response.status(400).json({
					message: `User cannot search himself!`
				})
			}
			
			return response.json(user)
		}
		else{
			return response.status(404).json({
				message: `User not found!`
			})
		}
	}
}


export {UserController}