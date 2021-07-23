import React from 'react'
import { StyledMessage } from '../../../styles/components/StyledChatMessageList/StyledMessageList/StyledMessage'
import { StyledSelfMessage } from '../../../styles/components/StyledChatMessageList/StyledMessageList/StyledMessage/StyledSelfMessage'


const MessageItem = ({content, author})=>{
	return (
		author=='me'?
		<StyledSelfMessage>
			<div>
				<p>{content}</p>
			</div>
		</StyledSelfMessage>
		:
		<StyledMessage>
			<span>{author}</span>
			<div>
				<div>
					<p>{content}</p>
				</div>
			</div>
		</StyledMessage>
	)
}


export {
	MessageItem
}