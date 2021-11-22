import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendNewPassword } from '../../services/PasswordResetService'
import { StyledLogin } from '../../styles/pages/StyledLogin'


const PasswordRecover = ()=>{
	
	const { token } = useParams()

	const [newPassword, setNewPassword] = useState('')
	const [repeatNewPassword, setRepeatNewPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const formChangePassword = useRef()
	
	function handleNewPasswordChange(event){
		const { target: passwordInput } = event

		// if(passwordInput.value!==repeatNewPassword){
		// 	passwordInput.setCustomValidity('Passwords does not match')
		// }
		// else{
		// 	passwordInput.setCustomValidity('')
		// }

		setNewPassword(passwordInput.value)
	}

	function handleRepeatNewPasswordChange(event){
		const { target: passwordInput } = event

		if(passwordInput.value!==newPassword){
			passwordInput.setCustomValidity('Passwords does not match')
		}
		else{
			passwordInput.setCustomValidity('')
		}

		setRepeatNewPassword(passwordInput.value)
	}

	async function handleFormSubmission(event){
		event.preventDefault()

		if(!formChangePassword.current.checkValidity()){
			formChangePassword.current.reportValidity()
		}
		else{
			try{
				

				const result = await sendNewPassword(newPassword, token)

				toast.success(result, { autoClose: 5000 })
			}
			catch(error){
				const {message} = error

				toast.error(message, {autoClose: 5000})
			}
		}
	}

	return <StyledLogin>
		<section className="loginContainer">
			<header className="loginHeader">
				<span>Create a new Password</span>
			</header>
			<form onSubmit={handleFormSubmission} className="login" ref={formChangePassword}>
				<div className="input-group">
					<label htmlFor="">New password</label>
					<input type="password" value={newPassword} onChange={handleNewPasswordChange}/>
				</div>
				<div className="input-group">
					<label htmlFor="">Repeat new password</label>
					<input type="password" value={repeatNewPassword} onChange={handleRepeatNewPasswordChange}/>
				</div>
				<button disabled={loading}>{loading?'Changing Password...':'Change Password'}</button>
			</form>
		</section>
	</StyledLogin>

}

export {
	PasswordRecover
}