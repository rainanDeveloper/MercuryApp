import React from 'react'
import {Chatlist} from '../components/ChatList/index.jsx'

function Home() {
	
		
	return (
		<div className="Home">
			<div className="container mrgnbtm">
				<Chatlist chatList={[{title: 'Duck', profilePicUrl:"https://duckduckgo.com/assets/logo_header.alt.v108.svg"}]}/>
			</div>
			<footer>
				
			</footer>
		</div>
	)
}

export {Home}
