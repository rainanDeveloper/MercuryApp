import React from 'react'
import { StyledChatList } from '../../styles/components/StyledChatList'
import { ChatlistItem } from './ChatlistItem'

const Chatlist = ({chatList=[]})=>{
	return <StyledChatList>
			{chatList.map((chat,i)=>{
				return <li key={i}>
					<ChatlistItem chat={chat}/>
				</li>
			})}
		</StyledChatList>
}

export {Chatlist}