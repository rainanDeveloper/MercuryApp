'use strict'
import { DataTypes, Model, Optional } from 'sequelize'
import {sequelize} from '.'
import { hash, compare } from 'bcrypt'
import { Chat, IChatInstance } from './chat'
import { UserChat } from './user_chat'

interface IUserAttributes {
	id: number
	login: string
	password?: string
	password_hash?: string
	public_key?: string
	email: string
	status?: number
}

interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}

interface IUserInstance extends Model<IUserAttributes, IUserCreationAttributes>, IUserAttributes {
	createdAt?: Date
	updatedAt?: Date
	newChat: IChatInstance
	validatePassword: Function
}

const User = sequelize.define<IUserInstance>(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.VIRTUAL
		},
		password_hash: {
			type: DataTypes.STRING
		},
		public_key: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,	
			allowNull: false,
			unique: true
		},
		status: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 0
		}
	},
	{
		tableName: 'users',
		hooks: {
			beforeSave: async (user: IUserInstance) => {
				if(user.password){
					user.password_hash = await hash( user.password, 8)
				}
			}
		}
	}
)

User.prototype.validatePassword = function(password: string){
	return compare(password, this.password_hash)
}

export {User, IUserInstance}