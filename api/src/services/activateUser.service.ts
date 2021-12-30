import { User } from '@models/user';
import { Request, Response } from 'express';
import { JWToken } from '../utils/JWToken';

const activateUser = async (request: Request, response: Response)=>{
    const { token } = request.params;

    if(!token){
        return response.status(401).send('Invalid token');
    }

    const tokenHandler = new JWToken({});

    const {login, email} = tokenHandler.validateToken(token);

    if(!login){
        return response.status(401).send('Invalid token');
    }

    if(!email){
        return response.status(401).send('Invalid token');
    }

    const userToValidate = await User.findOne({
        where: {
            login,
            email
        }
    });

    if(!userToValidate){
        return response.status(401).send('User not found!');
    }

    try{
        userToValidate.status = 1;

        await userToValidate.save();

        return response.redirect('/login');
    }
    catch(error){
        return response.status(500).send('Error while trying to update record');
    }
};

export {
    activateUser
};