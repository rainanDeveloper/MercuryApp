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
												
											</td>
										</tr>
										<tr>
											<td style="padding: 10px;" align="center">
												<a href="" style="text-decoration: none; border-radius: 5px; background: #0097e6; padding: 10px; color: white">Confirme sua inscrição</a>
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

			return response.json(userCreated)
		}
		catch(error){
			return response.status(500).json({
				message: `Error during user creation!`,
				error
			})
		}


	}

}


export {UserController}