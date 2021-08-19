import { Request, Response } from 'express'
import { UserChat } from '@models/user_chat'
import { Chat } from '@models/chat'
import { User } from '@models/user'
import { sequelize } from '@models/index'
import { Op } from 'sequelize'

User.belongsToMany(Chat, { through: UserChat, foreignKey: 'userId' })
Chat.belongsToMany(User, { through: UserChat, foreignKey: 'chatId' })

const ChatController = {
	async store(request: Request, response: Response){
		const {id: userId} = request['user']

		const { login } = request.body

		const toUser = await User.findOne({
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
		
		if(!toUser){
			return response.status(404).json({
				message: `Error: user ${login} not found!`
			})
		}

		if(toUser.id==userId){
			return response.status(400).json({
				message: `User cannot create a chat with yourself!`
			})
		}

		const existentChat = await Chat.findOne({
			include: [
				{
					model: User,
					where: {
						userId: {
							[Op.in]: [userId, toUser.id]
						}
					},
					required: true
				}
			]
		})

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
				userId: toUser.id
			}, {
				transaction
			})

			await transaction.commit()

			await newChat.reload({
				include: [
					{
						model: User,
						where: {
							id: {
								[Op.ne]: userId
							}
						},
						required: false,
						attributes: ['id', 'login', 'email', 'avatar', 'public_key']
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
	},
	async index(){

	},
	async show(request: Request, response: Response){
		const {id} = request.params

		const {id: userId} = request['user']

		const chat = await Chat.findOne({
			where: {
				id
			},
			include: [
				{
					model: User,
					where: {
						id: {
							[Op.ne]: userId
						}
					},
					required: false,
					attributes: ['id', 'login', 'email', 'avatar', 'public_key']
				}
			]
		})

		if(chat){
			return response.json(chat)
		}
		else{
			return response.status(404).json({
				message: `Chat ${id} not found!`
			})
		}
	}
}

export {ChatController}