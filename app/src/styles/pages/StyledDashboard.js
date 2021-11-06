import styled from "styled-components";

const StyledDashboard = styled.main`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	
	aside {
		width: 30%;
		min-width: 350px;
		border-right: solid 1px ${props=>props.theme.inputBorder};
		height: 100vh;
		position: relative;

		button.addChat {
			position: absolute;
			bottom: 15px;
			right: 15px;
			border-radius: 50%;
		}
	}
`

export { StyledDashboard }