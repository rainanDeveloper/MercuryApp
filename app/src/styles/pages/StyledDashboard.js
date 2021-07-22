import styled from "styled-components";

const StyledDashboard = styled.main`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	
	aside {
		width: 30%;
		min-width: 350px;
		border-right: solid 1px #ccc;
		height: 100vh;
	}
`

export { StyledDashboard }