import React from 'react'
import { StyledChatList } from '../../styles/components/StyledChatList'
import { ChatlistItem } from './ChatlistItem'
import { useParams, useHistory } from 'react-router-dom'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { BsGearFill } from 'react-icons/bs'
import { useTheme } from 'styled-components';
import { useState } from 'react'

const Chatlist = ({chatList=[]})=>{

	const { id: chatId } = useParams()

	const { textColor } = useTheme()
	const history = useHistory()

	const [showMenu, setShowMenu] = useState(false)

	function handleSignOut(event){
		event.preventDefault()

		localStorage.clear()

		history.push('/login')
	}

	function handleToogleMenu(event){
		event.preventDefault()

		setShowMenu(showMenu=>!showMenu)
	}

	return <StyledChatList>
			<div className="searchHeader">
				<form className="input-group">
					<input type="text" />
					<button><FaSearch color={textColor}/></button>
				</form>
				<div className="menu">
					<button onClick={handleToogleMenu}><BsGearFill size={24} color={textColor}/></button>
					<ul className={showMenu?'active':''}>
						<li>
							<button onClick={handleSignOut}>Sign Out <FaSignOutAlt/></button>
						</li>
					</ul>
				</div>
			</div>
			{chatList.map((chat,i)=>{
				return <li key={i} className={chatId==chat.id?'active':''}>
					<ChatlistItem chat={chat}/>
				</li>
			})}
		</StyledChatList>
}

export {Chatlist}