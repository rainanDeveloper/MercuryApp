import { Request, Response } from 'express'
import { Message } from '@models/message'

const MessageController = {
	async index(request: Request, response: Response){
		const {id: userId} = request['user']
		const {ch} = request.query

		const messages = await Message.findAll({
			where: {
				chatId: ch,
				userId
			}
		})

		return response.json(messages)
	},
	async store(request: Request, response: Response){
		const {chatId, content, content_type, timestamp} = request.body
		const {id: userId} = request['user']

		try{
			const newMessage = await Message.create({
				chatId,
				userId,
				timestamp,
				content,
				content_type
			})
	
			return response.json(newMessage)
		}
		catch(error){
			return response.status(500).json({
				message: 'Error while trying to record the message',
				error
			})
		}
	}
}


export {
	MessageController
}