import React from 'react'
import { useHistory } from 'react-router-dom'
import { StyledChatListItem } from '../../styles/components/StyledChatList/StyledChatListItem'

const ChatlistItem = ({chat})=>{
	const history = useHistory()

	function handleChatClick(){

		history.push(`/chat/${chat.id}`)
	}

	
	return <StyledChatListItem onClick={handleChatClick}>
		<div className="chatPic">
			<img src={chat.profilePicUrl} alt="" />
		</div>
		<div className="chatTitle">
			<span>{chat.title}</span>
		</div>
	</StyledChatListItem>
}

export {ChatlistItem}