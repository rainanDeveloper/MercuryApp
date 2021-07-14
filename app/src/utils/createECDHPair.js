'use strict'
import crypto from 'crypto'

const generateKeyFromData = (data)=>{
	
	// Generates secret from data

	var secret = ''

	if(typeof data == 'string'){		
		secret = crypto.createHash('sha256').update(data).digest('hex')
	}
	else{
		secret = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')
	}

	const clientKey = crypto.createECDH('secp256k1')

	clientKey.setPrivateKey(secret, 'hex')

	return [clientKey.getPrivateKey().toString('hex'), clientKey.getPublicKey().toString('hex')]
}

const generateSharedSecretFromKey = (clientKey, public2)=>{
	const sharedKey = clientKey.derive(public2)

	return sharedKey
}

export {
	generateKeyFromData,
	generateSharedSecretFromKey
}
