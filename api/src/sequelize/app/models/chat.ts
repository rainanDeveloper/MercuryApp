'use strict'
import { DataTypes, Model, Optional } from 'sequelize'
import {sequelize} from '.'
import { IUserInstance } from './user'

interface IChatAttributes {
	id: number
	name?: string
}

interface IChatCreationAttributes extends Optional<IChatAttributes, 'id'> {}

interface IChatInstance extends Model<IChatAttributes, IChatCreationAttributes>, IChatAttributes {
	createdAt?: Date
	updatedAt?: Date
	Users: Array<IUserInstance>
}


const Chat = sequelize.define<IChatInstance>(
	'Chat',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'chats'
	})


export {
	Chat, IChatInstance
}