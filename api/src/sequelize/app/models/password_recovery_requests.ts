'use strict';
import { DataTypes, Model, Optional } from 'sequelize'
import {sequelize} from '.'

interface IPasswordRecoveryRequestsAttributes {
	id: number
	invalid: boolean
    otgCode: string
    email: string
}


interface IPasswordRecoveryRequestsCreationAttributes extends Optional<IPasswordRecoveryRequestsAttributes, 'id'> {}

interface IPasswordRecoveryRequestsInstance extends Model<IPasswordRecoveryRequestsAttributes, IPasswordRecoveryRequestsCreationAttributes>, IPasswordRecoveryRequestsAttributes {
	createdAt?: Date
	updatedAt?: Date
}

const PasswordRecoveryRequest = sequelize.define<IPasswordRecoveryRequestsInstance>(
	'PasswordRecoveryRequest',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		invalid: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		otgCode: {
			type: DataTypes.INTEGER
		},
		email: {
			type: DataTypes.STRING
		}
	}
)