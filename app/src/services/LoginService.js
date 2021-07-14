import axios from 'axios'


const authenticate = async (login, password)=>{

	try {
		const response = await axios.post('/api/login', {
			login,
			password
		})

		return await response.data
	} catch (error) {
		throw new Error(error.response?.data?.message||error.message)
	}
}


export {
	authenticate
}