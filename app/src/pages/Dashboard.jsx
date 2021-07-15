import React from 'react'
import {Chatlist} from '../components/ChatList/index.jsx'
import { StyledDashboard } from '../styles/pages/StyledDashboard.js'

function Dashboard() {
	
		
	return (
		<StyledDashboard>
			<aside>
				<Chatlist chatList={[{id: 1,  title: 'Duck', profilePicUrl:"https://duckduckgo.com/assets/logo_header.alt.v108.svg"}]}/>
			</aside>
		</StyledDashboard>
	)
}

export {Dashboard}
