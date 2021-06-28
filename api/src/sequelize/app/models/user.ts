'use strict'
import { DataTypes, Model, Optional } from 'sequelize'
import {sequelize} from '.'

interface IUserAttributes {
	id: number
	login: string
	password: string
	email: string,
	status: number
}

interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}

interface IUserInstance extends Model<IUserAttributes, IUserCreationAttributes>, IUserAttributes {
	createdAt?: Date;
	updatedAt?: Date;
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
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,	
			allowNull: false,
			unique: true
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		tableName: 'users'
	}
)

export {User}