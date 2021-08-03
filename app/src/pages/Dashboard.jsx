import React, { useEffect, useState } from 'react'
import {Chatlist} from '../components/ChatList/index.jsx'
import { StyledDashboard } from '../styles/pages/StyledDashboard.js'
import { useHistory, Switch, Route } from 'react-router-dom'
import { getAuthInfo } from '../services/AuthInfoService.js'
import { DashboardWelcome } from '../components/DashboardWelcome.jsx'
import { StyledMainBody } from '../styles/components/StyledMainBody.js'
import { ChatMessageList } from '../components/ChatMessageList/index.jsx'
import { FaPlus } from 'react-icons/fa'
import { Modal } from '../components/Modal/index.jsx'
import { userSearch } from '../services/UserService.js'
import { createChat } from '../services/ChatService.js'
import { toast } from 'react-toastify';

function Dashboard() {

	const [chats, setChats]					= useState([])
	const [modalContact, setModalContact]	= useState(false)
	const [loginSearch, setLoginSearch]		= useState('')
	const [loading, setLoading]				= useState(false)

	const authtoken = localStorage.getItem('authtoken')

	const history = useHistory()
	
	useEffect(()=>{
		async function getChats(){
			if(authtoken){
				try{
					const data = await getAuthInfo()
	
					if(data){
						setChats(data.Chats.map(c=>{
							const chat = {}
	
							chat.id = c.id
							
							if(c.Users.length==1){
								chat.title = c.Users[0].login
								chat.profilePicUrl = c.Users[0].avatar || '/assets/images/defaultUser.jpg'
							}
							else{
								chat.title = c.name
								chat.profilePicUrl = '/assets/images/defaultUser.jpg'
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
		}

		getChats()
	}, [])

	async function handleSearchUser(event){
		event.preventDefault()

		try{
			const user = await userSearch(loginSearch)

			if(user){
				try{
					const newChat = await createChat(loginSearch)

					const listableChat = {
						id: newChat.id,
					}

					if(newChat.Users.length==1){
						listableChat.title = newChat.Users[0].login
						listableChat.profilePicUrl = newChat.Users[0].avatar || '/assets/images/defaultUser.jpg'
					}
					else{
						listableChat.title = newChat.name
						listableChat.profilePicUrl = '/assets/images/defaultUser.jpg'
					}

					setChats(oldChats=>[...oldChats, listableChat])

					setModalContact(false)
				}
				catch(error){
					toast.error(`Error while trying to create a new chat: ${error}`, {autoClose: 5000})
				}
			}
		}
		catch(error){
			toast.error(`Error during search for a user: ${error}`, {autoClose: 5000})	
		}

	}

	const buttons = [
		{
			title: 'Buscar',
			action: handleSearchUser,
			active: !loading
		}
	]

	function handleLoginSearchChange(event){
		event.preventDefault()

		setLoginSearch(event.target.value)
	}

	return (
		<StyledDashboard>
			<aside>
				<Chatlist chatList={chats}/>
				<button className="addChat" onClick={()=>setModalContact(true)}><FaPlus size={20}/></button>
				<Modal title='Adicionar contato' active={modalContact} changeActive={setModalContact} buttons={buttons}>
					<div className="input-group">
						<input type="text" placeholder="Search for a user..." value={loginSearch} onChange={handleLoginSearchChange}/>
					</div>
				</Modal>
			</aside>
			<StyledMainBody>
				<Switch>
					<Route path='/chat/:id' component={ChatMessageList}/>
					<Route exact path='/' component={DashboardWelcome}/>
				</Switch>
			</StyledMainBody>
		</StyledDashboard>
	)
}

export {Dashboard}
