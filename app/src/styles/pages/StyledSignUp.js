
import styled from 'styled-components';

const StyledSignUp  = styled.main`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	padding: 10px;
	margin: 0;
	align-items: center;

	section.signupContainer {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 350px;
		margin-top: 5vh;
	}

	header.signupHeader {
		display: flex;
		flex-direction: column;
		margin-bottom: 15px;
		align-items: center;
		justify-content: center;

		span {
			text-align: center;
			font-size: 1.4em;
			font-weight: 300;
		}
	}

	form.signup {
		display: flex;
		flex-direction: column;
		padding: 15px;
		background-color: ${props=>props.theme.backgroundLight};
		border-radius: 5px;
		border: solid 1px ${props=>props.theme.inputBorder};
		gap: 10px;
		font-size: 1em;
	}

	.passStrengthMetter {
		display: flex;
		width: 100%;
		height: 2px;
	}

	.passStrengthMetter span {
		background-color: red;
	}

`

export { StyledSignUp }