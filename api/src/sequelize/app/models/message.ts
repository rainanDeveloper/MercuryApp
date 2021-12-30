'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '.';
import { Chat } from './chat';
import { User } from './user';

interface IMessageAttributes {
	id: number
	content: string
	content_type: string
	timestamp: number
	chatId: number
	userId: number
}

type IMessageCreationAttributes = Optional<IMessageAttributes, 'id'>

interface IMessageInstance extends Model<IMessageAttributes, IMessageCreationAttributes>, IMessageAttributes {
	createdAt?: Date
	updatedAt?: Date
}


const Message = sequelize.define<IMessageInstance>(
    'Message',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        },
        content_type: {
            type: DataTypes.STRING
        },
        timestamp: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        chatId: {
            type: DataTypes.INTEGER,
            references: {
                model: Chat,
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    }, {
        tableName: 'messages'
    });


export {
    Message, IMessageInstance
};