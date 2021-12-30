'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '.';
import { Chat } from './chat';
import { User } from './user';

interface IUserChatAttributes {
	id: number
	chatId: number
	userId: number
}

type IUserChatCreationAttributes = Optional<IUserChatAttributes, 'id'>

interface IUserChatInstance extends Model<IUserChatAttributes, IUserChatCreationAttributes>, IUserChatAttributes {
	createdAt?: Date
	updatedAt?: Date
}


const UserChat = sequelize.define<IUserChatInstance>(
    'UserChat',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        tableName: 'user_chat'
    });


export {
    UserChat, IUserChatInstance
};