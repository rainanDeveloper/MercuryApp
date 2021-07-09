import React from 'react'
import { ChatlistItem } from './ChatlistItem'

const Chatlist = ({chatList=[]})=>{
	return <section>
		<ul>
			{chatList.map((chat,i)=>{
				return <li>
					<ChatlistItem chat={chat}/>
				</li>
			})}
		</ul>
	</section>
}

export {Chatlist}