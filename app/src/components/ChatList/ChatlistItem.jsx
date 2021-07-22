import React from 'react'
import { Link } from 'react-router-dom'
import { StyledChatListItem } from '../../styles/components/StyledChatList/StyledChatListItem'

const ChatlistItem = ({chat})=>{

	
	return <Link to={`/chat/${chat.id}`}>
		<StyledChatListItem>
			<div className="chatPic">
				<img src={chat.profilePicUrl} alt="" />
			</div>
			<div className="chatTitle">
				<span>{chat.title}</span>
			</div>
		</StyledChatListItem>
	</Link>
}

export {ChatlistItem}