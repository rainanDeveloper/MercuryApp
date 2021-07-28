import React, { useState } from 'react'
import { StyledChatMessageList } from '../../styles/components/StyledChatMessageList'
import { MessageList } from './MessageList'
import { TextUserInterator } from './TextUserInterator'

const ChatMessageList = ()=>{

	const [message, setMessage] = useState('')

	const chatHistory = [
		{
			content: 'Quote the Lorem Ipsum please!',
			author: 'contact'
		},
		{
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel mollis dolor. Proin sit amet leo sed est tincidunt dignissim. Sed at metus accumsan, aliquam nisl non, viverra elit. Suspendisse efficitur interdum libero, in ornare turpis varius id. Aliquam sollicitudin fermentum posuere. Nullam ut tristique tellus. Aenean aliquam, orci et consectetur egestas, arcu tellus pharetra nisi, in molestie magna justo a quam.',
			author: 'me'
		},
		{
			content: 'Continue please',
			author: 'me'
		},
		{
			content: 'Fusce sapien mauris, tincidunt id orci sed, sagittis laoreet tortor. Donec nisi risus, bibendum quis efficitur sit amet, semper sit amet tellus. Praesent consequat, ex ut feugiat lobortis, turpis quam accumsan felis, sit amet porttitor lorem tellus sit amet nulla. Vivamus bibendum tristique orci, in condimentum nisl maximus ut. Nullam suscipit ut dolor at ultrices. Nam ultrices euismod sapien, eu semper magna. Fusce ac magna quis augue feugiat lacinia a a metus. Curabitur congue tellus vitae rhoncus tristique.',
			author: 'contact'
		},
		{
			content: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin sollicitudin ligula hendrerit est facilisis laoreet. Donec elementum ornare erat a sagittis. In leo enim, elementum a ante nec, commodo laoreet libero. Donec pharetra, tellus ac laoreet hendrerit, felis nisl tincidunt risus, ac tempor nisl sapien a nisi. Maecenas non ullamcorper ex. Morbi accumsan turpis elit, in elementum metus facilisis in. Curabitur eget lorem dui. Donec accumsan vehicula lorem, nec iaculis elit ultricies sed. Proin nec eros in risus pulvinar bibendum. Praesent tempor turpis sed diam condimentum eleifend eu et ante. Suspendisse justo augue, lobortis quis elementum at, pharetra vel magna.',
			author: 'contact'
		}
	]

	function handleTextInteratorChanging(value){
		setMessage(value)
	}

	return <StyledChatMessageList>
		<MessageList chatHistory={chatHistory} messageDisplayed={message}/>
		<TextUserInterator value={message} onChange={handleTextInteratorChanging}/>
	</StyledChatMessageList>
}


export {
	ChatMessageList
}