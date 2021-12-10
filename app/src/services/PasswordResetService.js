import axios from 'axios'

const sendPasswordResetEmail = async (email)=>{
	try{
		const response = await axios.post('/api/passwd/recoveryEmail', {
			email
		})

		return response.data
	}
	catch(error){
		throw new Error(error.response?.data?.message||error.message)
	}
}

const sendNewPassword = async (password, publicKey, otg_code)=>{
	try{
		const response = await axios.post('/api/passwd/resetPassword', {
			password,
			publicKey,
			otg_code
		})

		return response.data
	}
	catch(error){
		throw new Error(error.response?.data?.message||error.message)
	}
}


export {
	sendPasswordResetEmail,
	sendNewPassword
}