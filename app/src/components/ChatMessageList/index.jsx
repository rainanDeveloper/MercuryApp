import React, { useState } from 'react'
import { StyledChatMessageList } from '../../styles/components/StyledChatMessageList'
import { MessageList } from './MessageList'
import { TextUserInterator } from './TextUserInterator'

const ChatMessageList = ()=>{

	const [message, setMessage] = useState('')

	const [chatHistory, setChatHIstory] = useState([])

	function handleAfterSubmitMessage(value){
		setChatHIstory(oldChatHistory=>[...oldChatHistory, {
			content: value,
			author: 'me'
		}])

		setMessage('')
	}

	function handleTextInteratorChanging(value){
		setMessage(value)
	}

	return <StyledChatMessageList>
		<MessageList chatHistory={chatHistory} messageDisplayed={message}/>
		<TextUserInterator value={message} onChange={handleTextInteratorChanging} afterSubmit={handleAfterSubmitMessage}/>
	</StyledChatMessageList>
}


export {
	ChatMessageList
}