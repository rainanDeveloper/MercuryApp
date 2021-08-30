import React from 'react'
import { useState } from 'react'
import { StyledLogin } from '../styles/pages/StyledLogin'

const ResetPassword = ()=>{

	const [login, setLogin]	= useState('')
	const [loading, setLoading]		= useState(false)

	function handleLoginChange(event){
		event.preventDefault()

		setLogin(event.target.value)
	}

	function handleSubmitForm(event){
		event.preventDefault()

		setLoading(true)
	}

	return <StyledLogin>
		<section className="loginContainer">
			<header className="loginHeader">
				<span>Password recovery</span>
			</header>
			<form className="login" onSubmit={handleSubmitForm}>
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
				<button disabled={loading}>{loading?'Sending recovery email...':'Recover Password'}</button>
			</form>
		</section>
	</StyledLogin>
}


export {
	ResetPassword
}