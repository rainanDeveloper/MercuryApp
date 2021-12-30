'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '.';

interface IPasswordRecoveryRequestsAttributes {
	id: number
	invalid: boolean
    otgCode: string
    email: string
}


type IPasswordRecoveryRequestsCreationAttributes = Optional<IPasswordRecoveryRequestsAttributes, 'id'>

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
            allowNull: false,
            defaultValue: true
        },
        otgCode: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        tableName: 'password_recovery_requests'
    }
);

export {
    PasswordRecoveryRequest,
    IPasswordRecoveryRequestsInstance
};