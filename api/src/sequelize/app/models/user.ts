'use strict'
import { DataTypes, Model } from 'sequelize'

interface IUserModel {
	id: number
	login: string
	password: string
	email: string,
	status: number
}

export default (sequelize, DataTypes) => {
	class user extends Model<IUserModel> implements IUserModel {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		id!: number
		login!: string
		password!: string
		email!: string
		status!: number
		static associate(models) {
			// define association here
		}
	}
	user.init({
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
	}, {
		sequelize,
		modelName: 'user',
	})
	return user
}