import React from 'react'
import { StyledTextUserInterator } from '../../../styles/components/StyledChatMessageList/StyledTextUserInterator'
import { FaImage, FaRegSmile } from 'react-icons/fa'
import { GrSend } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize'

const TextUserInterator = ({value='', onChange=()=>{}})=>{

	// Functions to modify text

	function sanitize(value){

		function replaceHeart(v){
			return v.replace(/\<3 /g, "\u2764 ")
		}

		return replaceHeart(value)

	}

	function handleTextareaChange(event){
		onChange(sanitize(event.target.value))
	}


	return <StyledTextUserInterator>
		<button className="imgBtn"><FaRegSmile size={22}/></button>
		<button className="imgBtn"><FaImage size={22}/></button>
		<div className="textContainer">
			<TextareaAutosize placeholder="Message" value={value} onChange={handleTextareaChange}/>
			<button className="sendBtn"><GrSend size={22}/></button>
		</div>
	</StyledTextUserInterator>
}


export {
	TextUserInterator
}