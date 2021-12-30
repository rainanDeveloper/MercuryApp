import React from 'react'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { sendNewPassword, sendPasswordResetEmail } from '../services/PasswordResetService'
import { StyledLogin } from '../styles/pages/StyledLogin'
import { useHistory } from 'react-router-dom'
import { passwordStrength } from '../utils/password'
import { calculateQuality, passIndcLength, qualityColors } from './SignUp';
import { generateKeyFromData } from '../utils/createECDHPair'

const EmailResetSendingForm = ({afterSending, afterError})=>{
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)

	function handleEmailChange(event){
		event.preventDefault()

		setEmail(event.target.value)
	}

	async function handleSubmitEmailForm(event){
		event.preventDefault()

		setLoading(true)

		try{
			const { message, userInfo } = await sendPasswordResetEmail(email)

			afterSending(message, userInfo)
		}
		catch(error){
			afterError(error)
		}
		finally{
			setLoading(false)
		}
	}

	return (
		<form className="login" onSubmit={handleSubmitEmailForm}>
			<div className="input-group">
				<label htmlFor="Email">Email address</label>
				<input
				id="Email"
				type="email"
				title="You must provide an email."
				placeholder="user@example.com"
				value={email}
				onChange={handleEmailChange}
				required/>
			</div>
			<button disabled={loading}>{loading?'Sending password recovery email...':'Send password recover email'}</button>
		</form>
	)
}

const ResetPasswordForm = ({afterSending, afterError, payload}) => {
	const [ otgCode, setOtgCode ] = useState('')
	const [ newPassword, setNewPassword ] = useState('')
	const [ newPasswordConfirm, setNewPasswordConfirm ] = useState('')
	const [ loading, setLoading] = useState(false)
	const [ pwdStrIndicator, setPwdStrIndicator ] = useState(0)
	const [ passwordEntropy, setPasswordEntropy ] = useState(0)
	const [ passwordQuality, setPasswordQuality ] = useState('Poor')
  

	useEffect(()=>{
		const entropy = passwordStrength(newPassword)

		const strengtIndc = entropy*100/passIndcLength
		
		setPasswordEntropy(entropy)
		setPwdStrIndicator(strengtIndc)
		setPasswordQuality(calculateQuality(entropy))
	}, [newPassword])

	function handleOtgCodeChange(event){
		const { target } = event
		
		const newOtgValue = target
			.value
			.replace(/\D/g, '')

		setOtgCode(newOtgValue)
	}

	function handleNewPasswordChange(event){
		event.preventDefault()

		const entropy = passwordStrength(event.target.value)

		setNewPassword(event.target.value.replace(/\s?\t?\n?/g, ''))

		if(entropy<40){
			event.target.setCustomValidity("Password too weak!")
		}
		else{
			event.target.setCustomValidity("")
		}
	}

	function handleNewPasswordConfirmChange(event){
		event.preventDefault()

		setNewPasswordConfirm(event.target.value.replace(/\s?\t?\n?/g, ''))
	}

	function handleNewPasswordConfirmBlur(event){
		event.preventDefault()

		if(newPasswordConfirm!==newPassword){
			event.target.setCustomValidity("Passwords do not match!")
		}
		else{
			event.target.setCustomValidity("")
		}
	}

	function validateOtg() {
		return otgCode.replace(/\D/g, '').length == 6
	}

	function switchRenderPassFields() {
		if(validateOtg()){
			return <>
				<div className="input-group">
					<label htmlFor="password">Password</label>
					<input
					type="password"
					pattern="^[^\s\t\n]+$"
					id="password"
					value={newPassword}
					onChange={handleNewPasswordChange}
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
					value={newPasswordConfirm}
					onChange={handleNewPasswordConfirmChange}
					onBlur={handleNewPasswordConfirmBlur}
					required
					/>
				</div>
			</>
		}
	}

	async function handleSubmitPasswordForm(event) {
		event.preventDefault()

		setLoading(true)

		try {

      // Generate private and public keys
			const [, publicKey] = generateKeyFromData({login: payload.login, email: payload.email, newPassword})

			const result = await sendNewPassword(newPassword, publicKey, otgCode)

			setNewPassword('')
			setNewPasswordConfirm('')

			afterSending(`Password changed for user with email ${result.email}!`)

		}
		catch(error) {
			afterError(error)
		}
		finally{
			setLoading(false)
		}
	}

	return (
		<form className="login" onSubmit={handleSubmitPasswordForm}>
			<div className="input-group">
				<label htmlFor="otgCode">Code sended to your email</label>
				<input
				id="otgCode"
				type="text"
				title="You must provide the code sended to you email address"
				value={otgCode}
				onChange={handleOtgCodeChange}
				maxLength="6"
				required/>
			</div>
			{switchRenderPassFields()}
			<button disabled={loading}>{loading?'Changing password...':'Change password'}</button>
		</form>
	)
}

const ResetPassword = ()=>{

	const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [ userLogin, setUserLogin ] = useState('')
  const [ userEmail, setUserEmail ] = useState('')

	const history = useHistory()

	async function handleSucessfullEmailSending(message, user){

		toast.success(message, { autoClose: 5000 })

    setUserEmail(user.email)

    setUserLogin(user.login)

		setShowPasswordFields(true)
		
	}

	async function handleSuccessfullPasswordChange(message){

		console.log(message)
		
		const toastTimeout = 5000
		
		toast.success(message, { autoClose: toastTimeout })
		
		setTimeout(() => {
			history.push('/login')
		}, toastTimeout + 1000);

	}

	async function handleError(error){
		const {message} = error

		toast.error(message, {autoClose: 5000})
	}

	function switchRenderForm(condition) {
		if(condition) {
			return <ResetPasswordForm afterSending={handleSuccessfullPasswordChange} payload={{login: userLogin, email: userEmail}} afterError={handleError}/>
		}
		else{
			return <EmailResetSendingForm afterSending={handleSucessfullEmailSending} afterError={handleError}/>
		}
	}

	return <StyledLogin>
		<section className="loginContainer">
			<header className="loginHeader">
				<span>Password recovery</span>
			</header>
			{switchRenderForm(showPasswordFields)}
		</section>
		<ToastContainer />
	</StyledLogin>
}


export {
	ResetPassword
}