import { Request, Response } from 'express'
import { User } from '@models/user'
import { ITemplateEmailMessage, MailService } from '../services/mail.service'
import { sequelize } from '@models/index'
import { JWToken } from '../utils/JWToken'
import { Op } from 'sequelize'
import { UserChat } from '@models/user_chat'
import { Chat } from '@models/chat'

const UserController = {
  
  async index(request: Request, response: Response){
    
    const users = await User.findAll({
      attributes: ['id', 'login']
    })
    
    return response.json(users)
    
  },
  async store(request: Request, response: Response) {
    const {
      login,
      password,
      email,
      public_key
    } = request.body
    
    const transaction = await sequelize.transaction()
    
    try{
      
      // Creates a user
      
      const userCreated = await User.create({
        login,
        password,
        email,
        public_key
      }, {transaction})
      
      const newChat = await Chat.create({
        name: 'Notes to self'
      }, {transaction})
      
      
      const userChatRelation = await UserChat.create({
        userId: userCreated.id,
        chatId: newChat.id
      }, { transaction })
      
      
      // If user is successfully created, sends an email to the user
      
      // Create jwt token for confirmation
      
      const token = new JWToken({}).createToken({login, email})
      
      const link = `http://${request.hostname}/api/user/confirmation/${token}`
      
      const mailer = new MailService()
      
      
      const message: ITemplateEmailMessage = {
        to: `<${email}>`,
        subject: 'User account activation',
        template: 'user-account-activation',
        context: {
          link
        }
      }
      
      await mailer.sendTemplateEmail(message)
      
      // After successfully email sending, transaction is finally executed
      await transaction.commit()
      
      return response.json(userCreated)
    }
    catch(error){
      transaction.rollback()
      
      return response.status(500).json({
        message: `Error during user creation: ${error}`,
        error
      })
    }
    
    
  },
  async show(request: Request, response: Response){
    const {identifier} = request.params
    
    const {id: userId} = request['user']
    
    const user = await User.findOne({
      attributes: ['id', 'login'],
      where: {
        [Op.or]: [
          {
            login: identifier
          },
          {
            email: identifier
          }
        ]
      }
    })
    
    if(user){
      if(user.id==userId){
        return response.status(400).json({
          message: `User cannot search himself!`
        })
      }
      
      return response.json(user)
    }
    else{
      return response.status(404).json({
        message: `User not found!`
      })
    }
  }
}


export {UserController}