'use strict'
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const generateKeyFromData = (data)=>{
	
	// Generates secret from data

	var secret = ''

	if(typeof data == 'string'){		
		secret = crypto.createHash('sha256').update(data).digest('hex')
	}
	else{
		secret = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')
	}

	const clientKey = ec.keyFromPrivate(secret)

	return clientKey
}

const generateSharedSecretFromKey = (clientKey, public2)=>{
	const sharedKey = clientKey.derive(public2)

	return sharedKey
}

module.exports = {
	generateKeyFromData,
	generateSharedSecretFromKey
}
