import styled from "styled-components";

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
		margin-top: 5%;
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
		background-color: #f6f8fa;
		border-radius: 5px;
		border: solid 1px #e4e4e4;
		gap: 10px;
		font-size: 1em;
	}
`

export { StyledLogin }