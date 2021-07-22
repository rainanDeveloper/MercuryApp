import React from 'react'
import { StyledChatMessageList } from '../../styles/components/StyledChatMessageList'
import { MessageList } from './MessageList'
import { TextUserInterator } from './TextUserInterator'

const ChatMessageList = ()=>{
	return <StyledChatMessageList>
		<MessageList/>
		<TextUserInterator/>
	</StyledChatMessageList>
}


export {
	ChatMessageList
}