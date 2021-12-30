import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config({
    path: '.env',
});

interface ITokenDefinitions {
	secret?: string
	expiration?: string
}

class JWToken {
    private secret: string =  process.env.APP_SECRET || '';
    private expiresIn: string = process.env.TOKEN_EXPIRATION || '1d';

    constructor({secret, expiration}: ITokenDefinitions){
        if(secret){
            this.secret = secret;
        }

        if(expiration){
            this.expiresIn = expiration;
        }

    }

    createToken(payload){
        return sign(payload, this.secret, {expiresIn: this.expiresIn});
    }

    validateToken(token){
        return verify(token, this.secret);
    }
}

export {JWToken};