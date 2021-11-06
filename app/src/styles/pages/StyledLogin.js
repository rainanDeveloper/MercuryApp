import styled from "styled-components";
import { colors } from '../colors'

const StyledLogin = styled.main`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	padding: 10px;
	margin: 0;
	align-items: center;

	section.loginContainer {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 350px;
		margin-top: 5vh;
	}

	header.loginHeader {
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

	form.login {
		display: flex;
		flex-direction: column;
		padding: 15px;
		background-color: ${props=>props.theme.backgroundLight};
		border-radius: 5px;
		border: solid 1px ${props=>props.theme.inputBorder};
		gap: 10px;
		font-size: 1em;
	}

	.passLabel {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 5px;
	}

	span.passReset {
		font-size: 0.8em;
		color: ${props=>props.theme.spanTextColor};
		a {
			background: none;
			border: none;
			padding: initial;
			color: ${colors.secondary};
		}
	}
`

export { StyledLogin }