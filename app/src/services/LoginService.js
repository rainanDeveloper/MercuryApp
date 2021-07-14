import axios from 'axios'


const authenticate = async (login, password)=>{

	try {
		const response = await axios.post('/api/auth', {
			login,
			password
		})

		return await response.data
	} catch (error) {
		throw new Error(error.message)
	}
}


export {
	authenticate
}