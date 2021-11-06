import axios from 'axios'

const sendPasswordResetEmail = async (login)=>{
	try{
		const response = await axios.post('/api/passwd/recoveryEmail', {
			login
		})

		return response.data
	}
	catch(error){
		throw new Error(error.response?.data?.message||error.message)
	}
}

const sendNewPassword = async (password, token)=>{
	try{
		const response = await axios.post('/api/passwd/resetPassword', {
			password,
			token
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