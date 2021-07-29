import React from 'react'
import { StyledTextUserInterator } from '../../../styles/components/StyledChatMessageList/StyledTextUserInterator'
import { FaImage, FaRegSmile } from 'react-icons/fa'
import { GrSend } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize'
import { sendMessage } from '../../../services/MessageService'
import { useParams } from "react-router-dom"

const TextUserInterator = ({value='', onChange=()=>{}, afterSubmit=()=>{}})=>{

	const { id: chatId } = useParams()

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
			event.preventDefault()
			sensibleKeys[event.key]()
		}


	}

	function handleSendMessage(event){
		if(event){
			event.preventDefault()
		}

		if(value.length>0){
			try{
				sendMessage({
					chatId,
					content: value,
					timestamp: Date.now(),
					content_type: 'text'
				})
				console.log(value)
				afterSubmit(value)
			}
			catch(error){

			}
			finally{
				
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
		<button className="sendBtn" onClick={handleSendMessage}><GrSend size={22}/></button>
	</StyledTextUserInterator>
}


export {
	TextUserInterator
}