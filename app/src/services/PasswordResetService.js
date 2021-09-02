import axios from 'axios'

const sendPasswordResetEmail = (login)=>{
	try{
		const response = await axios.post('api/passwor/recoveryEmail', {
			login
		})

		return response.data
	}
	catch(error){
		throw new Error(error.response?.data?.message||error.message)
	}
}


export {
	sendPasswordResetEmail
}