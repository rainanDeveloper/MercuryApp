import React, { useEffect, useState } from 'react'
import { StyledSignUp } from '../styles/pages/StyledSignUp'
import { passwordStrength } from '../utils/password'

const SignUp = ()=>{

	const [password, setPassword]				= useState('')
	const [passwordConfirm, setPasswordConfirm]	= useState('')

	function handlePasswordChange(event){
		event.preventDefault()

		setPassword(event.target.value)
	}

	function handlePasswordConfirmChange(event){
		event.preventDefault()

		setPasswordConfirm(event.target.value)
	}
	
	return <StyledSignUp>
		<section className="signupContainer">
			<header className="signupHeader">
				<span>Sign up to MercuryApp</span>
			</header>
			<form className="signup">
				<div className="input-group">
					<label htmlFor="username">Username</label>
					<input
					type="text"
					id="username"
					pattern="^[\w]+$"
					title="Username should only contain letters"
					placeholder="ExampleUser"
					/>
				</div>
				<div className="input-group">
					<label htmlFor="email">Email</label>
					<input
					type="email"
					id="email"
					title="You must provide an email"
					placeholder="user@example.com"
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password">Password</label>
					<input
					type="password"
					id="password"
					value={password}
					onChange={handlePasswordChange}
					/>
					<div className="passStrengthMetter">
						{passwordStrength(password)>0?
						<span style={{width: `${passwordStrength(password)}%`, background: `${passwordStrength(password)<35?'red':((passwordStrength(password)<75)?'#f1c40f':'green')}`}}></span>
						:<></>}
					</div>
				</div>
				<div className="input-group">
					<label htmlFor="password_confirm">Confirm Password</label>
					<input
					type="password"
					id="password_confirm"
					value={passwordConfirm}
					onChange={handlePasswordConfirmChange}
					/>
				</div>
			</form>
		</section>
	</StyledSignUp>
}


export { SignUp }