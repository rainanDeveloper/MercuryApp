import { User } from "@models/user"
import { Request, Response } from 'express'
import { Op } from "sequelize"
import { JWToken } from "utils/JWToken"
import { IMail, transporter } from '../services/nodemailer.service'
import { v4 as uuid} from 'uuid'

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

	const recover_uuid = uuid()
	
	userToRecover.recover_uuid = recover_uuid

	userToRecover.save()

	const token = new JWToken({}).createToken({login, recover_uuid})
	
	const link = `http://${request.host}/password/recover/${token}`

	const html = `
	<!DOCTYPE html>
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
	<td style="padding: 10px;">Foi solicitado a troca de senha do seu usuário em nossa plataforma. Clique no link abaixo para resetar a sua senha:</td>
	</tr>
	<tr>
	<td style="padding: 10px;" align="center"><a style="text-decoration: none; border-radius: 5px; background: #0097e6; padding: 10px; color: white;" href="${link}">Resetar senha</a></td>
	</tr>
	</tbody>
	</table>
	</td>
	</tr>
	</tbody>
	</table>
	</body>
	</html>
	`

	try{
		const message: IMail = {
			to: `<${userToRecover.email}>`,
			from: `MercuryApp <${process.env.APPLICATION_MAIL}>`,
			subject: 'User password recovery',
			text: `Recover your password: ${link}`,
			html
		}
		
		await transporter.sendMail(message)
	
		return response.json({
			message: "Email sended"
		})
	}
	catch(error){
		return response.status(500).json({
			message: "Error during email sending",
			error
		})
	}
}

const setNewPassword = async (request: Request, response: Response) => {
	const { token, password } = request.body

	const tokenHandler = new JWToken({})

	const {login, recover_uuid} = tokenHandler.validateToken(token)

	if(!login){
		return response.status(401).json({
			message: 'Invalid token'
		})
	}

	if(!recover_uuid){
		return response.status(401).json({
				message: 'Invalid token'
			})
	}

	const changeableUser = await User.findOne({
		where: {
			[Op.or]: [
				{login},
				{email: login}
			],
			recover_uuid
		}
	})

	if(changeableUser){
		
		changeableUser.password = password
		changeableUser.recover_uuid = ''

		try {
			changeableUser.save()

			return response.json(changeableUser);
		}
		catch(error){
			return response.status(500).json({
				message: `Server error during user saving: ${error.message}`
			})
		}
	}
	else{
		return response.status(404).json({
			message: 'User not found or invalid recover unique id'
		})
	}

}

export {
	sendResetEmail,
	setNewPassword
}