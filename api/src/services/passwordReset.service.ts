import { PasswordRecoveryRequest } from "@models/password_recovery_requests"
import { User } from "@models/user"
import { Request, Response } from 'express'
import { Op } from "sequelize"
import { IMail, transporter } from '../services/nodemailer.service'

const sendResetEmail = async (request: Request, response: Response) => {
	const { email } = request.body

	if(!email){
		return response.status(401).json({
			message: 'Invalid email!'
		})
	}

	const userToRecover = await User.findOne({
		where: {
			[Op.or]: [
				{
					email
				}
			]
		}
	})

	if(!userToRecover){
		return response.status(404).json({
			message: 'User not found!'
		})
	}

	const otg_code = `${Math.random()}`.slice(-6)

	await PasswordRecoveryRequest.findOne({
		where: {
			email,
			invalid: false
		}
	}).then(async (request)=>{
		if(request) {
			request.otgCode = otg_code

			await request.save()
		}
		else{
			PasswordRecoveryRequest.create({
				invalid: false,
				email,
				otgCode: otg_code
			})
		}
	})

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
	<td style="padding: 10px;">Código para alteração de senha:</td>
	</tr>
	<tr>
	<td style="padding: 10px; font-size: 32px" align="center">${otg_code}</td>
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
			to: `<${email}>`,
			from: `MercuryApp <${process.env.APPLICATION_MAIL}>`,
			subject: 'User password recovery',
			text: `Código para alteração de senha: ${otg_code}`,
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
	const { otg_code, password, publicKey } = request.body

	const resetRequest = await PasswordRecoveryRequest.findOne({
		where: {
			otgCode: otg_code
		}
	})

	if(!resetRequest) {
		return response.status(404).json({
			message: `OTG Code not found!`
		})
	}

	const changeableUser = await User.findOne({
		where: {
			email: resetRequest.email
		}
	})

	if(changeableUser){
		
		changeableUser.password = password
		changeableUser.public_key = publicKey

		try {
			changeableUser.save()

			resetRequest.destroy();

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