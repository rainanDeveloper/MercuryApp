import React, { useState } from 'react'
import { StyledLogin } from '../styles/pages/StyledLogin'

const Login = ()=>{


	const [login, setLogin]			= useState('')
	const [password, setPassword]	= useState('')

	function handleLoginChange(event){
		setLogin(event.target.value)
	}
	
	function handlePasswordChange(event){
		setPassword(event.target.value)
	}


	return <StyledLogin>
		<section className="loginContainer">
			<header className="loginHeader">
				<span>Sign in to MercuryApp</span>
			</header>
			<form className="login">
				<div className="input-group">
					<label htmlFor="usernameOrEmail">Username or email address</label>
					<input
					id="usernameOrEmail"
					type="text"
					pattern="^[\w]+|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$"
					title="Username should only contain letters. If you have inserted a email, please verify if it is correctly written."
					value={login}
					onChange={handleLoginChange}
					required/>
				</div>
				<div className="input-group">
					<label htmlFor="password">Password</label>
					<input type="password" required value={password} onChange={handlePasswordChange}/>
				</div>
				<button>Sign In</button>
			</form>
		</section>
		
	</StyledLogin>
}

export { Login }