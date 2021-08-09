import React, { useEffect, useState } from 'react'
import { StyledChatMessageList } from '../../styles/components/StyledChatMessageList'
import { MessageList } from './MessageList'
import { TextUserInterator } from './TextUserInterator'
import { useParams } from "react-router-dom"
import { listMessages } from '../../services/MessageService'
import { toast, ToastContainer } from 'react-toastify'
import { showChatInfo } from '../../services/ChatService'
import { generateSharedSecretFromKeys } from '../../utils/createECDHPair'
import { decryptContent } from '../../utils/AESEncryption'
import { proxy } from '../../../package.json'
const isDev = process.env.NODE_ENV === 'development'



const ChatMessageList = ()=>{
	
	const [message, setMessage] = useState('')
	
	const [chatHistory, setChatHistory] = useState([])
	
	const { id: chatId } = useParams()
	
	const [chatTitle, setChatTitle] 		= useState('')
	const [chatAvatar, setChatAvatar] 		= useState('')
	const [destPublicKey, setDestPublicKey]	= useState(localStorage.getItem('publicKey'))
	const wsClient = new WebSocket(isDev?proxy.replace(/^http/g, 'ws'):`ws://${window?.location?.host}`)

	wsClient.addEventListener('open', () => {
		// Subscribes to the chat with id "chatId"
		
	})
	
	useEffect(()=>{
		async function getChatMessages(){
			
			try{

				const chat = await showChatInfo(chatId)

				if(chat['Users'].length>0){
					const messages = await listMessages(chatId, chat['Users'][0].public_key)
	
					setChatHistory(messages)
				}
				else{
					const messages = await listMessages(chatId, localStorage.getItem('publicKey'))
	
					setChatHistory(messages)
				}

				
			}
			catch(error){
				toast.error(`Error while trying to retrieve messages: ${error.message}`, {autoClose: 5000})
			}
		}

		getChatMessages()

		async function getChatInfo(){
			try{
				const chat = await showChatInfo(chatId)

				if(chat['Users'].length>0){
					setChatTitle(chat['Users'][0].login||'')
					setChatAvatar(chat['Users'][0].avatar||'/assets/images/defaultUser.jpg')
					setDestPublicKey(chat['Users'][0].public_key||localStorage.getItem('publicKey'))
				}
				else{
					setChatTitle(chat.name||'')
					setChatAvatar('/assets/images/defaultUser.jpg')
					setDestPublicKey(localStorage.getItem('publicKey'))

				}
			}
			catch(error){
				toast.error(`Error while trying to retrieve chat info: ${error.message}`, {autoClose: 5000})

			}
		}

		getChatInfo()
	}, [chatId])

	function handleAfterSubmitMessage(message){
		setChatHistory(oldChatHistory=>{
			const privateKey = localStorage.getItem('privateKey')
			
			const sharedKey = generateSharedSecretFromKeys(privateKey, destPublicKey)

			message.content = decryptContent(message.content, sharedKey)

			return [...oldChatHistory, message]
		})

		setMessage('')
	}

	function handleTextInteratorChanging(value){
		setMessage(value)
	}

	return <StyledChatMessageList>
		<div className="currentChatInfo">
			<div className="currentChatAvatar">
				<img src={chatAvatar||'/assets/images/defaultUser.jpg'} alt="Chat Avatar" />
			</div>
			<div className="currentChatTitle">
				{chatTitle||''}
			</div>
		</div>
		<MessageList chatHistory={chatHistory} messageDisplayed={message}/>
		<TextUserInterator value={message} onChange={handleTextInteratorChanging} afterSubmit={handleAfterSubmitMessage}/>
		<ToastContainer />
	</StyledChatMessageList>
}


export {
	ChatMessageList
}