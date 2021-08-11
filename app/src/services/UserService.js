import axios from 'axios'


const userSearch = async (login)=>{

	try {

		const authtoken = localStorage.getItem('authtoken')

		const response = await axios.get(`/api/user/${login}`, {
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
	userSearch
}
