import axios from 'axios'


const createChat = async (login)=>{

	try {

		const authtoken = localStorage.getItem('authtoken')

		const response = await axios.post('/api/chat', {
			login
		}, {
			headers: {
				authtoken
			}
		})

		return await response.data
	} catch (error) {
		throw error
	}
}

const showChatInfo = async (chatId)=>{
	try {

		const authtoken = localStorage.getItem('authtoken')

		const response = await axios.get(`/api/chat/${chatId}`, {
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
	createChat,
	showChatInfo
}