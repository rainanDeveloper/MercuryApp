import React from 'react'
import { StyledMessageList } from '../../../styles/components/StyledChatMessageList/StyledMessageList'
import { MessageItem } from './MessageItem'

const MessageList = ()=>{
	return <StyledMessageList>
		<ul>
			<li>
				<MessageItem content={'Olá'} author={'me'} />
			</li>
			<li>
				<MessageItem content={'Olá, como vai?'} author={'wilma'}/>
			</li>
		</ul>
	</StyledMessageList>
}


export {
	MessageList
}