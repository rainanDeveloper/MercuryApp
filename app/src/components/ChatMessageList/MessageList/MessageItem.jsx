import React from 'react'
import { StyledMessage } from '../../../styles/components/StyledChatMessageList/StyledMessageList/StyledMessage'
import { StyledSelfMessage } from '../../../styles/components/StyledChatMessageList/StyledMessageList/StyledMessage/StyledSelfMessage'
import jwt_decode from 'jwt-decode'
import moment from 'moment'


const MessageItem = ({content, author, timestamp})=>{
	const authtoken = localStorage.getItem('authtoken')

	var {login} = jwt_decode(authtoken)

	return (
		author==login?
		<StyledSelfMessage>
			<div>
				<p>{content}</p>
				<span className="timestamp">{moment(timestamp).format('HH:mm')}</span>
			</div>
		</StyledSelfMessage>
		:
		<StyledMessage>
			<span>{author}</span>
			<div>
				<div>
					<p>{content}</p>
					<span className="timestamp">{moment(timestamp).format('HH:mm')}</span>
				</div>
			</div>
		</StyledMessage>
	)
}


export {
	MessageItem
}