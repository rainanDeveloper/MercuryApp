const crypto = require('crypto')
const iv = Buffer.from("9ee0bf151a825661bf86b70f47229992", 'hex')

const encryptContent = (data, hex_key)=>{

	if(!data){
		throw new Error("You must provide data to be encrypted!")
	}
	
	if(!hex_key){
		throw new Error("You must provide a encryption key!")
	}

	const key = Buffer.from(hex_key, 'hex')

	var dataBuffer

	if(typeof data == 'string'){
		dataBuffer = Buffer.from(data)
	}
	else{
		dataBuffer = Buffer.from(JSON.stringify(data))
	}
	
	var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

	cipher.update(dataBuffer)


	return cipher.final('base64')
	
}

const decryptContent = (cryptedData, hex_key)=>{
	if(!cryptedData){
		throw new Error("You must provide data to be encrypted!")
	}
	
	if(!hex_key){
		throw new Error("You must provide a encryption key!")
	}

	const key = Buffer.from(hex_key, 'hex')

	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)

	decipher.setAutoPadding(true)

	let decrypted = decipher.update(cryptedData, 'base64', 'utf8')

	decrypted += decipher.final()

	return decrypted
}

module.exports = {
	encryptContent,
	decryptContent
}