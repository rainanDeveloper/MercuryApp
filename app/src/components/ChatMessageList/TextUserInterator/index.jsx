import React from 'react'
import { StyledTextUserInterator } from '../../../styles/components/StyledChatMessageList/StyledTextUserInterator'
import { FaImage, FaRegSmile } from 'react-icons/fa'
import { GrSend } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize'

const TextUserInterator = ()=>{
	return <StyledTextUserInterator>
		<button className="imgBtn"><FaRegSmile size={22}/></button>
		<button className="imgBtn"><FaImage size={22}/></button>
		<div className="textContainer">
			<TextareaAutosize />
			<button className="sendBtn"><GrSend size={22}/></button>
		</div>
	</StyledTextUserInterator>
}


export {
	TextUserInterator
}