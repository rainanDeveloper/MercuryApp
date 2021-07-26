import React, { useEffect, useRef } from 'react'
import { StyledMessageList } from '../../../styles/components/StyledChatMessageList/StyledMessageList'
import { MessageItem } from './MessageItem'

const MessageList = ({chatHistory=[]})=>{
	const refMessageListEnd = useRef()

	function handleSizeChange(){
		if(refMessageListEnd.current){
			const messageEnd = refMessageListEnd.current

			messageEnd.scrollIntoView()
		}
	}

	useEffect(()=>{
		window.addEventListener('resize', handleSizeChange)
	}, [])

	useEffect(()=>{
		if(refMessageListEnd.current){
			const messageEnd = refMessageListEnd.current

			messageEnd.scrollIntoView()
		}
	}, [chatHistory])

	return <StyledMessageList onRes>
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