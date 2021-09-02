import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { sendPasswordResetEmail } from '../services/PasswordResetService'
import { StyledLogin } from '../styles/pages/StyledLogin'
import { useHistory } from 'react-router-dom'

const ResetPassword = ()=>{

	const [login, setLogin] = useState('')
	const [loading, setLoading] = useState(false)

	const history = useHistory()

	function handleLoginChange(event){
		event.preventDefault()

		setLogin(event.target.value)
	}

	function handleRedirectAfterRecoverEmail(event){
		event.preventDefault()

		const timer = setTimeout(()=>{
			history.push('/login')
		}, 6000)

		return ()=>clearTimeout(timer)
	}

	async function handleSubmitForm(event){
		event.preventDefault()

		setLoading(true)

		try{
			const { message } = await sendPasswordResetEmail(login)

			toast.success(message, { autoClose: 5000 })

			setLogin('')

			handleRedirectAfterRecoverEmail(event)
		}
		catch(error){
			const {message} = error

			toast.error(message, {autoClose: 5000})
		}
		finally{
			setLoading(false)
		}
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
		<ToastContainer />
	</StyledLogin>
}


export {
	ResetPassword
}