import React from 'react'
import { StyledTextUserInterator } from '../../../styles/components/StyledChatMessageList/StyledTextUserInterator'
import { FaImage, FaRegSmile } from 'react-icons/fa'
import { GrSend } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize'

const TextUserInterator = ({value='', onChange=()=>{}})=>{

	// Functions to modify text

	function sanitize(value){

		const iconize = []

		iconize.push((v)=>{
			return v.replace(/\<3 /g, "\u2764 ")
		})

		
		return iconize.reduce((v, f)=>f(v), value)

	}

	function handleTextareaChange(event){
		onChange(sanitize(event.target.value))
	}


	return <StyledTextUserInterator>
		<button className="imgBtn"><FaRegSmile size={22}/></button>
		<button className="imgBtn"><FaImage size={22}/></button>
		<div className="tooltipContainer">
			<div className="text">
				<div className="textContainer">
					<TextareaAutosize placeholder="Message" value={value} onChange={handleTextareaChange}/>
				</div>
			</div>
		</div>
		<button className="sendBtn"><GrSend size={22}/></button>
	</StyledTextUserInterator>
}


export {
	TextUserInterator
}