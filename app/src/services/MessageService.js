import axios from 'axios'
import { encryptContent, decryptContent } from '../utils/AESEncryption'
import {generateSharedSecretFromKeys} from '../utils/createECDHPair'

const sendMessage = async (message, dest_public_key)=>{

	try {
		const authtoken = localStorage.getItem('authtoken')
		const privateKey = localStorage.getItem('privateKey')

		const {
			chatId,
			content,
			timestamp,
			content_type
		} = message

		const sharedKey = generateSharedSecretFromKeys(privateKey, dest_public_key)

		const encMessage = {
			chatId,
			content: encryptContent(content, sharedKey),
			timestamp,
			content_type
		}

		const response = await axios.post('/api/messages', encMessage, {
			headers: {
				authtoken
			}
		})

		return await response.data
	} catch (error) {
		throw new Error(error.response?.data?.message||error.message)
	}
}

const listMessages = async (chatId, dest_public_key)=>{
	try {
		const authtoken = localStorage.getItem('authtoken')
		const privateKey = localStorage.getItem('privateKey')

		const response = await axios.get('/api/messages', {
			params: {
				chatId
			},
			headers: {
				authtoken
			}
		})

		const sharedKey = generateSharedSecretFromKeys(privateKey, dest_public_key)

		return await response.data.map(m=>{
			m.content = decryptContent(m.content, sharedKey)

			return m
		})
	} catch (error) {
		throw new Error(error.response?.data?.message||error.message)
	}
}


export {
	sendMessage,
	listMessages
}