import React from 'react'
import { Link } from 'react-router-dom'
import { StyledHome } from '../styles/pages/StyledHome'


function Home() {
	
		
	return (
		<StyledHome>
			<header>
				<h1>Mercury App</h1>
				<div className="initialPageButtons">
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
				</div>
			</header>
		</StyledHome>
	)
}

export {Home}
