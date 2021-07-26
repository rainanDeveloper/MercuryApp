import React, { useEffect, useRef } from 'react'
import { StyledMessageList } from '../../../styles/components/StyledChatMessageList/StyledMessageList'
import { MessageItem } from './MessageItem'

const MessageList = ({chatHistory=[]})=>{
	const refMessageListEnd = useRef()

	useEffect(()=>{
		if(refMessageListEnd.current){
			const messageEnd = refMessageListEnd.current

			messageEnd.scrollIntoView({
				behavior: 'smooth'
			})
		}
	}, [chatHistory])

	return <StyledMessageList>
		<ul>
			{chatHistory.map(m=>{
				return (
				<li>
					<MessageItem content={m.content} author={m.author} />
				</li>
				)
			})}
			<div ref={refMessageListEnd}></div>
		</ul>
	</StyledMessageList>
}


export {
	MessageList
}