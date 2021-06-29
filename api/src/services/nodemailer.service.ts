import { createTransport } from 'nodemailer'

require('dotenv').config({
	path: '.env'
})

interface IMail {
	from: string
	to: string
	subject?: string
	text?: string
	html?: string
}

const host		= process.env.MAILER_HOST
const port		= process.env.MAILER_PORT
const user		= process.env.MAILER_USER
const pass		= process.env.MAILER_PASS
const secure	= process.env.MAILER_SECURE

const transporter = createTransport({
	host: host || 'smtp.example.com',
	port: port && 587,
	auth: {
		user: user || 'test@example.com',
		pass: pass || '123456'
	},
	secure: secure && true
})

export {
	transporter,
	IMail
}