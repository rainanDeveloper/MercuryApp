import React from 'react'
import {Chatlist} from '../components/ChatList/index.jsx'
import { StyledHome } from '../styles/pages/StyledHome.js'

function Home() {
	
		
	return (
		<StyledHome>
			<aside>
				<Chatlist chatList={[{id: 1,  title: 'Duck', profilePicUrl:"https://duckduckgo.com/assets/logo_header.alt.v108.svg"}]}/>
			</aside>
		</StyledHome>
	)
}

export {Home}
