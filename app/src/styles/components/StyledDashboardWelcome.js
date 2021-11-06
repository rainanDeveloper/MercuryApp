import styled from "styled-components";


const StyledDashboardWelcome = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	width: 100%;
	height: 100%;
	padding: 0;
	text-align: center;
	padding: 10px;

	h1 {
		font-size: 3em;
	}

	h2 {
		font-size: 2em;
	}

	span {
		font-size: 1em;
		max-width: 400px;
		width: 90%;
	}
`


export {
	StyledDashboardWelcome
}