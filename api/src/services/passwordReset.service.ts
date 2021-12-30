import { PasswordRecoveryRequest } from '@models/password_recovery_requests';
import { User } from '@models/user';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { ITemplateEmailMessage, MailService } from './mail.service';

const sendResetEmail = async (request: Request, response: Response) => {
    const { email } = request.body;
  
    if(!email){
        return response.status(401).json({
            message: 'Invalid email!'
        });
    }
  
    const userToRecover = await User.findOne({
        where: {
            [Op.or]: [
                {
                    email
                }
            ]
        }
    });
  
    if(!userToRecover){
        return response.status(404).json({
            message: 'User not found!'
        });
    }
  
    const otg_code = `${Math.random()}`.slice(-6);
  
    await PasswordRecoveryRequest.findOne({
        where: {
            email,
            invalid: false
        }
    }).then(async (request)=>{
        if(request) {
            request.otgCode = otg_code;
      
            await request.save();
        }
        else{
            PasswordRecoveryRequest.create({
                invalid: false,
                email,
                otgCode: otg_code
            });
        }
    });
  
    try{
        const mailer = new MailService();
    
        const message: ITemplateEmailMessage = {
            to: userToRecover.email,
            subject: 'MercuryApp | Password recovery request',
            template: 'email-reset-password',
            context: {
                otg_code
            }
        };
    
        mailer.sendTemplateEmail(message);
    
        return response.json({
            message: 'Email sended'
        });
    }
    catch(error){
        return response.status(500).json({
            message: 'Error during email sending',
            error
        });
    }
};

const setNewPassword = async (request: Request, response: Response) => {
    const { otg_code, password, publicKey } = request.body;
  
    const resetRequest = await PasswordRecoveryRequest.findOne({
        where: {
            otgCode: otg_code
        }
    });
  
    if(!resetRequest) {
        return response.status(404).json({
            message: 'OTG Code not found!'
        });
    }
  
    const changeableUser = await User.findOne({
        where: {
            email: resetRequest.email
        }
    });
  
    if(changeableUser){
    
        changeableUser.password = password;
        changeableUser.public_key = publicKey;
    
        try {
            changeableUser.save();
      
            resetRequest.destroy();
      
            return response.json(changeableUser);
        }
        catch(error){
            return response.status(500).json({
                message: `Server error during user saving: ${error.message}`
            });
        }
    }
    else{
        return response.status(404).json({
            message: 'User not found or invalid recover unique id'
        });
    }
  
};

export {
    sendResetEmail,
    setNewPassword
};