import axios from 'axios'


const createUser = async (login, email, password, public_key)=>{

	try {
		const response = await axios.post('/api/user', {
			login,
			email,
			password,
			public_key
		})

		return await response.data
	} catch (error) {
		throw new Error(error.response?.data?.message||error.message)
	}
}


export {
	createUser
}