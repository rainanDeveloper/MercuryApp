import React, { useEffect, useState } from 'react'
import {Chatlist} from '../components/ChatList/index.jsx'
import { StyledDashboard } from '../styles/pages/StyledDashboard.js'
import { useHistory, BrowserRouter, Switch, Route } from 'react-router-dom';
import { getAuthInfo } from '../services/AuthInfoService.js';
import { DashboardWelcome } from '../components/DashboardWelcome.jsx';
import { StyledMainBody } from '../styles/components/StyledMainBody.js';

function Dashboard({chatId=null}) {

	const [chats, setChats]		= useState([])

	const authtoken = localStorage.getItem('authtoken')

	const history = useHistory()
	
	useEffect(async ()=>{
		if(authtoken){
			try{
				const data = await getAuthInfo(authtoken)

				if(data){
					setChats(data.Chats.map(c=>{
						const chat = {}

						/** 
						 * Chat structure:
						 * {
						 * 		id: number,
						 * 		title: string,
						 * 		profilePicUrl: string
						 * }
						 * */ 

						chat.id = c.id
						chat.title = c.name
						
						if(c.Users.length==1){
							chat.profilePicUrl = c.Users[0].avatar || '/assets/defaultUser.jpg'
						}
						else{
							chat.profilePicUrl = '/assets/defaultUser.jpg'
						}

						return chat
					}))
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

	const Teste = ({match})=>{
		const {params} = match

		return <>{params.id}</>
	}
		
	return (
		<StyledDashboard>
			<aside>
				<Chatlist chatList={chats}/>
			</aside>
			<StyledMainBody>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' component={DashboardWelcome}/>
					</Switch>
				</BrowserRouter>
			</StyledMainBody>
		</StyledDashboard>
	)
}

export {Dashboard}
