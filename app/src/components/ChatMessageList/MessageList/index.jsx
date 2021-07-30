import React, { useEffect, useRef } from 'react'
import { StyledMessageList } from '../../../styles/components/StyledChatMessageList/StyledMessageList'
import { MessageItem } from './MessageItem'

const MessageList = ({chatHistory=[], messageDisplayed})=>{
	const refMessageListEnd = useRef()

	function handleSizeChange(){
		if(refMessageListEnd.current){
			const messageEnd = refMessageListEnd.current

			messageEnd.scrollIntoView()
		}
	}

	useEffect(()=>{
		window.addEventListener('resize', handleSizeChange)
	}, [messageDisplayed])

	useEffect(()=>{
		if(refMessageListEnd.current){
			const messageEnd = refMessageListEnd.current

			messageEnd.scrollIntoView()
		}
	}, [chatHistory])

	return <StyledMessageList onRes>
		<ul>
			{chatHistory.map((m, i)=>{
				return (
				<li key={`message_${i}`}>
					<MessageItem content={m.content} author={m.User.login} timestamp={m.timestamp} />
				</li>
				)
			})}
			<div className="scrollComponent" ref={refMessageListEnd}></div>
		</ul>
	</StyledMessageList>
}


export {
	MessageList
}