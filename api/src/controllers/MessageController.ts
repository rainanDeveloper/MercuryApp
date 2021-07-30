import { Request, Response } from 'express'
import { Message } from '@models/message'
import { Chat } from '@models/chat'
import { UserChat } from '@models/user_chat'
import { User } from '@models/user'


Message.belongsTo(User, { foreignKey: 'userId' })

UserChat.belongsTo(User, { foreignKey: 'userId' })
UserChat.belongsTo(Chat, { foreignKey: 'chatId' })

const MessageController = {
	async index(request: Request, response: Response){
		const {id: userId} = request['user']
		const {chatId} = request.query

		const userChatRelation = await UserChat.findOne({
			where: {
				userId,
				chatId
			}
		})

		if(userChatRelation){
			const messages = await Message.findAll({
				where: {
					chatId
				},
				include: [
					{
						model: User,
						attributes: ['id', 'login']
					}
				]
			})
	
			return response.json(messages)
	
		}
		else{
			return response.status(404).json({
				message: `Chat not found for this user!`
			})
		}

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

			await newMessage.reload({
				include: [
					{
						model: User,
						attributes: ['id', 'login']
					}
				]
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