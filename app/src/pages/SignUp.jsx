import React, { useState } from 'react'
import { StyledSignUp } from '../styles/pages/StyledSignUp'
import { passwordStrength } from '../utils/password'
import { createUser } from '../services/SignUpService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = ()=>{

	const [login, setLogin]						= useState('')
	const [email, setEmail]						= useState('')
	const [password, setPassword]				= useState('')
	const [passwordConfirm, setPasswordConfirm]	= useState('')
	const [loading, setLoading]					= useState(false)


	function handleLoginChange(event){
		event.preventDefault()

		setLogin(event.target.value)
	}

	function handleEmailChange(event){
		event.preventDefault()

		setEmail(event.target.value)
	}

	function handlePasswordChange(event){
		event.preventDefault()

		setPassword(event.target.value)

		if(passwordStrength(event.target.value)<35){
			event.target.setCustomValidity("Password too weak!")
		}
		else{
			event.target.setCustomValidity("")
		}
	}

	function handlePasswordConfirmChange(event){
		event.preventDefault()

		setPasswordConfirm(event.target.value)
	}

	function handlePasswordConfirmBlur(event){
		event.preventDefault()

		if(passwordConfirm!==password){
			event.target.setCustomValidity("Passwords do not match!")
		}
		else{
			event.target.setCustomValidity("")
		}
	}

	async function handleSignUpFormSubmit(event){
		event.preventDefault()

		setLoading(true)

		try{
			const myself = await createUser(login, email, password)

			toast.success(`user successfully created! Verify email ${myself.email} to activate account!`, {autoClose: 5000})
		}
		catch(error){
			toast.error(`Error while trying to Sign Up: ${error.message}`, {autoClose: 5000})
		}

		setLoading(false)
	}
	
	return <StyledSignUp>
		<section className="signupContainer">
			<header className="signupHeader">
				<span>Sign up to MercuryApp</span>
			</header>
			<form className="signup" onSubmit={handleSignUpFormSubmit}>
				<div className="input-group">
					<label htmlFor="username">Username</label>
					<input
					type="text"
					id="username"
					pattern="^[\w]+$"
					title="Username should only contain letters"
					placeholder="ExampleUser"
					value={login}
					onChange={handleLoginChange}
					required
					/>
				</div>
				<div className="input-group">
					<label htmlFor="email">Email</label>
					<input
					type="email"
					id="email"
					title="You must provide an email"
					placeholder="user@example.com"
					value={email}
					onChange={handleEmailChange}
					required
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password">Password</label>
					<input
					type="password"
					id="password"
					value={password}
					onChange={handlePasswordChange}
					required
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
					onBlur={handlePasswordConfirmBlur}
					required
					/>
				</div>
				<button disabled={loading}>{loading?'Signing Up...':'Sign Up'}</button>
			</form>
		</section>
		<ToastContainer/>
	</StyledSignUp>
}


export { SignUp }