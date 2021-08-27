import React, { useState } from 'react'
import { authenticate } from '../services/LoginService'
import { StyledLogin } from '../styles/pages/StyledLogin'
import { generateKeyFromData } from '../utils/createECDHPair'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const Login = ()=>{

	const [login, setLogin]			= useState('')
	const [password, setPassword]	= useState('')
	const [loading, setLoading]		= useState(false)


	function handleLoginChange(event){
		setLogin(event.target.value)
	}

	function handlePasswordChange(event){
		setPassword(event.target.value)
	}

	async function handleLoginFormSubmit(event){
		event.preventDefault()

		setLoading(true)

		try{
			const {token, data} = await authenticate(login, password)

			if(token){
				localStorage.setItem('authtoken', token)
				
				// Generate private and public keys
				const [privateKey, publicKey] = generateKeyFromData({...data, password})


				localStorage.setItem('privateKey', privateKey)
				localStorage.setItem('publicKey', publicKey)

				window.location.pathname="./"
			}
		}
		catch(error){
			toast.error(`Error while trying to Sign In: ${error.message}`, {autoClose: 5000})
		}

		setLoading(false)
	}


	return <StyledLogin>
		<section className="loginContainer">
			<header className="loginHeader">
				<span>Sign in to MercuryApp</span>
			</header>
			<form className="login" onSubmit={handleLoginFormSubmit}>
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
					<label htmlFor="password" className="passLabel">Password <span className="passReset">Forgot password? <Link to="/resetPasswd">Reset</Link></span></label>
					<input type="password" required value={password} onChange={handlePasswordChange}/>
				</div>
				<div className="accountOptionSwitcher">
					Don't have an account yet? <Link to="/signup">Sign Up</Link>
				</div>
				<button disabled={loading}>{loading?'Signing In...':'Sign In'}</button>
			</form>
		</section>
		<ToastContainer />
	</StyledLogin>
}

export { Login }