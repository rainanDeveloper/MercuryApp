import axios from 'axios'


const getAuthInfo = async (authtoken)=>{

	try {
		const response = await axios.get('/api/auth/info', {
			headers: {
				authtoken
			}
		})

		return await response.data
	} catch (error) {
		throw error
	}
}


export {
	getAuthInfo
}