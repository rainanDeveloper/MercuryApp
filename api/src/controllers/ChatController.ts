import { Request, Response } from 'express'
import { UserChat } from '@models/user_chat'
import { Chat } from '@models/chat'
import { User } from '@models/user'
import { sequelize } from '@models/index'

User.belongsToMany(Chat, { through: UserChat, foreignKey: 'userId' })
Chat.belongsToMany(User, { through: UserChat, foreignKey: 'chatId' })

const ChatController = {
	async store(request: Request, response: Response){
		const {id: userId} = request['user']

		const { login } = request.body

		const toUser = await User.findOne({
			where: {
				login
			}
		})
		
		if(!toUser){
			return response.status(404).json({
				message: `Error: user ${login} not found!`
			})
		}

		const transaction = await sequelize.transaction()

		try{
			const newChat = await Chat.create({})

			await UserChat.create({
				chatId: newChat.id,
				userId
			}, {
				transaction
			})

			await UserChat.create({
				chatId: newChat.id,
				userId
			}, {
				transaction
			})

			await transaction.commit()

			await newChat.reload({
				include: [
					{
						model: User
					}
				]
			})

			return response.json(newChat)
		}
		catch(error){

			transaction.rollback()

			return response.status(500).json({
				message: `Error while trying to create new conversation`,
				error
			})
		}
	}
}

export {ChatController}