import React, { useEffect, useState } from 'react'
import {Chatlist} from '../components/ChatList/index.jsx'
import { StyledDashboard } from '../styles/pages/StyledDashboard.js'
import { useHistory } from 'react-router-dom';
import { getAuthInfo } from '../services/AuthInfoService.js';

function Dashboard({chatId=null}) {

	const [chats, setChats]		= useState([])

	const authtoken = localStorage.getItem('authtoken')

	const history = useHistory()
	
	useEffect(async ()=>{
		if(authtoken){
			try{
				const data = await getAuthInfo(authtoken)

				if(data){
					setChats(data.UserChats.map(c=>({
						id: c.Chat.id,
						title: c.Chat.name
					})))
				}
			}
			catch(error){
				if(error?.response?.status == 401){
					localStorage.clear()
					window.location.pathname='/login'
				}
			}
		}
		else{
			history.push('/login')
		}
	}, [])
		
	return (
		<StyledDashboard>
			<aside>
				<Chatlist chatList={chats}/>
			</aside>
		</StyledDashboard>
	)
}

export {Dashboard}
