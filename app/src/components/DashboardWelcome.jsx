import React from 'react'
import { StyledDashboardWelcome } from '../styles/components/StyledDashboardWelcome'

const DashboardWelcome = ()=>{
	return <StyledDashboardWelcome>
		<h1>Welcome to MercuryApp!</h1>
		
		<h2>Everything is already setted-up!</h2>

		<span>You can now send end-to-end encrypted messages with your keys never leaving your machine!</span>
	</StyledDashboardWelcome>
}


export {
	DashboardWelcome
}