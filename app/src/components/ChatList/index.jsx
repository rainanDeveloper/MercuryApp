import React from 'react'
import { StyledChatList } from '../../styles/components/StyledChatList'
import { ChatlistItem } from './ChatlistItem'
import { useParams } from 'react-router-dom';

const Chatlist = ({chatList=[]})=>{

	const { id: chatId } = useParams()

	return <StyledChatList>
			{chatList.map((chat,i)=>{
				return <li key={i} className={chatId==chat.id?'active':''}>
					<ChatlistItem chat={chat}/>
				</li>
			})}
		</StyledChatList>
}

export {Chatlist}