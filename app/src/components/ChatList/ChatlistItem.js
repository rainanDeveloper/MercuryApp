import React from 'react'

const ChatlistItem = ({chat})=>{
	return <div>
		<div className="chatPic">
			<img src={chat.profilePicUrl} alt="" />
		</div>
		<div className="chatTitle">
			{chat.title}
		</div>
	</div>
}

export {ChatlistItem}