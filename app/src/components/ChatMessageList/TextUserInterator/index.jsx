import React, { useState } from 'react'
import { StyledTextUserInterator } from '../../../styles/components/StyledChatMessageList/StyledTextUserInterator'
import { FaImage, FaRegSmile } from 'react-icons/fa'
import { GrSend } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize'
import { sendMessage } from '../../../services/MessageService'
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify'

const TextUserInterator = ({value='', onChange=()=>{}, afterSubmit=()=>{}})=>{

	const { id: chatId }		= useParams()
	const [loading, setLoading]	= useState(false)

	// Functions to modify text

	function sanitize(value){

		const iconize = []

		iconize.push((v)=>{
			return v.replace(/\<3 /g, "\u2764 ")
		})

		
		return iconize.reduce((v, f)=>f(v), value)

	}

	function handleTextareaChange(event){
		event.preventDefault()		

		onChange(sanitize(event.target.value))
	}

	function handleTextAreaKeyDown(event){
		const sensibleKeys = {
			Enter: ()=>{
				const sendWithEnter = localStorage.getItem('sendWithEnter')

				if(eval(sendWithEnter)){
					handleSendMessage()
				}
			}
		}

		if(typeof sensibleKeys[event.key]==='function'){
			sensibleKeys[event.key]()
		}


	}

	async function handleSendMessage(event){
		if(event){
			event.preventDefault()
		}
		
		if(value.length>0){
			setLoading(true)
			try{
				const message = await sendMessage({
					chatId,
					content: value,
					timestamp: Date.now(),
					content_type: 'text'
				})
				afterSubmit(message)
			}
			catch(error){
				toast.error(`Error while trying to send message: ${error}`, { autoClose: 5000 })
			}
			finally{
				setLoading(false)
			}
		}
	}


	return <StyledTextUserInterator>
		<button className="imgBtn"><FaRegSmile size={22}/></button>
		<button className="imgBtn"><FaImage size={22}/></button>
		<div className="tooltipContainer">
			<div className="text">
				<div className="textContainer">
					<TextareaAutosize onKeyDown={handleTextAreaKeyDown} placeholder="Message" value={value} onChange={handleTextareaChange}/>
				</div>
			</div>
		</div>
		<button className="sendBtn" disabled={loading} onClick={handleSendMessage}><GrSend size={22}/></button>
	</StyledTextUserInterator>
}


export {
	TextUserInterator
}