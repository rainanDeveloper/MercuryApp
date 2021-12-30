import { NextFunction, Request, Response } from 'express';
import { User } from '@models/user';
import { JWToken } from '../utils/JWToken';
import { UserChat } from '@models/user_chat';
import { Chat } from '@models/chat';
import { Op } from 'sequelize';

User.belongsToMany(Chat, { through: UserChat, foreignKey: 'userId' });
Chat.belongsToMany(User, { through: UserChat, foreignKey: 'chatId' });

const SessionController = {
    async store(request: Request, response: Response){
        const { login, password } = request.body;

        if(!login){
            return response.status(400).json({
                message: 'Required login/password fields weren\'t fullfilled'
            });
        }

        if(!password){
            return response.status(400).json({
                message: 'Required login/password fields weren\'t fullfilled'
            });
        }

        try {
            const user = await User.findOne({
                where: {
                    login
                }
            });

            if(!user){
                return response.status(401).json({
                    message: 'Incorrect login or password!'
                });
            }

            if(!(await user.validatePassword(password))){
                return response.status(401).json({
                    message: 'Incorrect login or password!'
                });
            }

            const token = new JWToken({}).createToken({login: user.login, email: user.email});

            if(token){
                return response.json({
                    token,
                    data: {
                        login: user.login,
                        email: user.email
                    }
                });
            }
            else{
                return response.status(500).json({
                    message: 'Error while trying to autenticate user!'
                });
            }
        }
        catch(error){
            return response.status(500).json({
                message: 'Error while trying to autenticate user!'
            });
        }
    },
    async show(request: Request, response: Response){
        const { authtoken: token } = request.headers;

        if(!token){
            return response.status(401).json({
                message: 'No authtoken provided!'
            });
        }

        try{
            const data = await new JWToken({}).validateToken(token);

            if(data){
                const user = await User.findOne({
                    attributes: ['id', 'login', 'email'],
                    where: {
                        login: data.login
                    },
                    include: [
                        {
                            model: Chat,
                            include: [
                                {
                                    model: User,
                                    where: {
                                        [Op.and]: [
                                            {
                                                login: {
                                                    [Op.ne]: data.login
                                                }
                                            },
                                            {
                                                email: {
                                                    [Op.ne]: data.login
                                                }
                                            }
                                        ]
                                    },
                                    required: false,
                                    attributes: ['id', 'login', 'email', 'avatar', 'public_key']
                                }
                            ]
                        }
                    ]
                });

                if(user){
                    return response.json(user);
                }
                else{
                    return response.status(401).json({
                        message: 'Invalid authtoken!'
                    });
                }
            }
        }
        catch(error){
            return response.status(401).json({
                message: 'Invalid authtoken!'
            });
        }
    },
    async validationMiddleware(request: Request, response: Response, next: NextFunction){
        const { authtoken: token } = request.headers;

        if(!token){
            return response.status(401).json({
                message: 'No authtoken provided!'
            });
        }

        try{
            const data = await new JWToken({}).validateToken(token);

            if(data){
                const user = await User.findOne({
                    attributes: ['id', 'login', 'email'],
                    where: {
                        login: data.login
                    },
                    include: [
                        {
                            model: Chat,
                            include: [
                                {
                                    model: User
                                }
                            ]
                        }
                    ]
                });

                if(user){
                    request['user'] = {
                        id: user.getDataValue('id')
                    };

                    next();
                }
                else{
                    return response.status(401).json({
                        message: 'Invalid authtoken!'
                    });
                }
            }
        }
        catch(error){
            return response.status(401).json({
                message: 'Invalid authtoken!'
            });
        }
    }
};


export { SessionController };