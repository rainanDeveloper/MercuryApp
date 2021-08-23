import styled from "styled-components";

const StyledDashboard = styled.main`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	width: 100vw;
	
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

	@media (max-width: 700px){
		aside {
			min-width: 220px;
			width: 20%;
		}
	}

	@media (max-width: 520px){
		aside {
			width: 100vw;
		}

		section.mainBody {
			display: none;
		}

		section.mainBody.active {
			display: flex;
			width: 100%;
		}

		aside.active {
			display: none;
		}
	}

	
`

export { StyledDashboard }