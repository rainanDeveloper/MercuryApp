import axios from 'axios'


const sendMessage = async (message)=>{

	try {
		const authtoken = localStorage.getItem('authtoken')

		const response = await axios.post('/api/messages', message, {
			headers: {
				authtoken
			}
		})

		return await response.data
	} catch (error) {
		throw new Error(error.response?.data?.message||error.message)
	}
}

const listMessages = async (chatId)=>{
	try {
		const authtoken = localStorage.getItem('authtoken')

		const response = await axios.get('/api/messages', {
			params: {
				chatId
			},
			headers: {
				authtoken
			}
		})

		return await response.data
	} catch (error) {
		throw new Error(error.response?.data?.message||error.message)
	}
}


export {
	sendMessage,
	listMessages
}