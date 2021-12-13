import { createTransport, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import path from 'path';
import ejs from 'ejs';
import * as fs from 'fs';

require('dotenv').config({
  path: '.env'
})


export interface IEmailMessage {
  to: string,
  subject: string,
}

export interface IBodyEmailMessage extends IEmailMessage {
  body: string;
}

export interface ITemplateEmailMessage extends IEmailMessage {
  template: string,
  context: any
}

export class MailService {
  
  transporter: Transporter;
  
  private readonly templateFolder = process.env.TEMPLATE_EMAIL_FOLDER || './src/templates/emails'
  
  constructor () {
    this.transporter = createTransport({
      host: process.env.MAILER_HOST || 'smtp.example.com',
      port: parseInt(process.env.MAILER_PORT) || 587,
      auth: {
        user: process.env.MAILER_USER || 'test@example.com',
        pass: process.env.MAILER_PASS || '123456'
      },
      secure: process.env.MAILER_SECURE=='true',
      ...(process.env.MAILER_REJECT_UNAUTH?{
        tls:{
          rejectUnauthorized: process.env.MAILER_REJECT_UNAUTH=='true'
        }
      }:{}),
      debug: true
    })
  }
  
  async sendEmail(message: IBodyEmailMessage){
    if(!this.transporter)
    return;
    
    const emailMessage: Mail.Options = {
      from: process.env.APPLICATION_EMAIL,
      to: message.to,
      subject: message.subject,
      html: message.body,
    }
    
    return this.transporter.sendMail(emailMessage);
  }
  
  async sendTemplateEmail(message: ITemplateEmailMessage) {
    if(!this.transporter)
    return;
    
    const filename = path.join(
      this.templateFolder,
      `${message.template}.ejs`
      )
      
      if (!fs.existsSync(filename))
      throw new Error('Template de e-mail não encontrado');
      
      const templateString = fs.readFileSync(filename, { encoding: 'utf-8' });
      
      const body = await ejs.render(
        templateString,
        {
          context: message.context,
          async: true,
        },
        { async: true },
        );
        
        return await this.sendEmail({ ...message, body });
      }
    }
    
    
    