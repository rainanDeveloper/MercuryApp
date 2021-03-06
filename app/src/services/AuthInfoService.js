import axios from 'axios'


const getAuthInfo = async ()=>{

	try {
		const authtoken = localStorage.getItem('authtoken')
		
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