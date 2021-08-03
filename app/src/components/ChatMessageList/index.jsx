import React, { useEffect, useState } from 'react'
import { StyledChatMessageList } from '../../styles/components/StyledChatMessageList'
import { MessageList } from './MessageList'
import { TextUserInterator } from './TextUserInterator'
import { useParams } from "react-router-dom"
import { listMessages } from '../../services/MessageService'
import { toast, ToastContainer } from 'react-toastify'

const ChatMessageList = ()=>{

	const [message, setMessage] = useState('')

	const [chatHistory, setChatHIstory] = useState([])

	const { id: chatId } = useParams()

	useEffect(()=>{
		async function getChatMessages(){
			try{
				const messages = await listMessages(chatId)
	
				setChatHIstory(messages)
			}
			catch(error){
				toast.error(`Error while trying to retrieve messages: ${error.message}`, {autoClose: 5000})
			}
		}

		getChatMessages()
	}, [chatId])

	function handleAfterSubmitMessage(message){
		setChatHIstory(oldChatHistory=>[...oldChatHistory, message])

		setMessage('')
	}

	function handleTextInteratorChanging(value){
		setMessage(value)
	}

	return <StyledChatMessageList>
		<MessageList chatHistory={chatHistory} messageDisplayed={message}/>
		<TextUserInterator value={message} onChange={handleTextInteratorChanging} afterSubmit={handleAfterSubmitMessage}/>
		<ToastContainer />
	</StyledChatMessageList>
}


export {
	ChatMessageList
}