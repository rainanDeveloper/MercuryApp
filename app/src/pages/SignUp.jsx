import React, { useState, useEffect } from 'react'
import { StyledSignUp } from '../styles/pages/StyledSignUp'
import { passwordStrength } from '../utils/password'
import { createUser } from '../services/SignUpService'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { generateKeyFromData } from '../utils/createECDHPair'

const SignUp = ()=>{

	const [login, setLogin]									= useState('')
	const [email, setEmail]									= useState('')
	const [password, setPassword]							= useState('')
	const [passwordConfirm, setPasswordConfirm]				= useState('')
	const [loading, setLoading]								= useState(false)
	const [pwdStrIndicator, setPwdStrIndicator]				= useState(0)
	const [passwordEntropy, setPasswordEntropy]				= useState(0)
	const [passwordQuality, setPasswordQuality] 			= useState('Poor')

	const qualityColors = {
		Poor: "#e22006",
		Weak: "#b85904",
		Good: "#64a416",
		Excellent: "#50cf01"
	}

	const passIndcLength = 200

	const history = useHistory()

	useEffect(()=>{
		const entropy = passwordStrength(password)

		const strengtIndc = entropy*100/passIndcLength
		
		setPasswordEntropy(entropy)
		setPwdStrIndicator(strengtIndc)
		setPasswordQuality(calculateQuality(entropy))
	}, [password])

	function calculateQuality(entropy){
		if (entropy < 40) {
        	return "Poor"
    	} else if (entropy < 65) {
        	return "Weak"
    	} else if (entropy < 100) {
        	return "Good"
    	}
    	return "Excellent"
	}

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

		const entropy = passwordStrength(event.target.value)

		setPassword(event.target.value.replace(/\s?\t?\n?/g, ''))

		if(entropy<40){
			event.target.setCustomValidity("Password too weak!")
		}
		else{
			event.target.setCustomValidity("")
		}
	}

	function handlePasswordConfirmChange(event){
		event.preventDefault()

		setPasswordConfirm(event.target.value.replace(/\s?\t?\n?/g, ''))
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

	function handleRedirectAfterSignUpTimer(event){
		event.preventDefault()

		const timer = setTimeout(()=>{
			history.push('/login')
		}, 6000)

		return ()=>clearTimeout(timer)
	}

	async function handleSignUpFormSubmit(event){
		event.preventDefault()

		setLoading(true)

		try{

			// Generate private and public keys
			const [, publicKey] = generateKeyFromData({login, email, password})

			const myself = await createUser(login, email, password, publicKey)

			toast.success(`User successfully created! Verify email ${myself.email} to activate account!`, {autoClose: 5000})

			handleRedirectAfterSignUpTimer(event)
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
					pattern="^[^\s\t\n]+$"
					id="password"
					value={password}
					onChange={handlePasswordChange}
					required
					/>
					<div className="passStrengthMetter">
						{pwdStrIndicator>0?
						<span style={{width: `${pwdStrIndicator}%`, background: `${qualityColors[passwordQuality]}`}}></span>
						:<></>}
					</div>
					<div className="passQuality">
						<span>Password Quality: {passwordQuality}</span> <span>Entropy: {passwordEntropy.toFixed(2)} bit</span>
					</div>
				</div>
				<div className="input-group">
					<label htmlFor="password_confirm">Confirm Password</label>
					<input
					type="password"
					pattern="^[^\s\t\n]+$"
					id="password_confirm"
					value={passwordConfirm}
					onChange={handlePasswordConfirmChange}
					onBlur={handlePasswordConfirmBlur}
					required
					/>
				</div>
				<div className="accountOptionSwitcher">
					Already have an account? <Link to="/login">Login</Link>
				</div>
				<button disabled={loading}>{loading?'Signing Up...':'Sign Up'}</button>
			</form>
		</section>
		<ToastContainer/>
	</StyledSignUp>
}


export { SignUp }