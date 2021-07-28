import styled from "styled-components";


const StyledSelfMessage = styled.div`
	text-align: right;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	flex-direction: column;
	margin-right: 10px;

	div {
		flex-direction: column;
		background: #192a56;
		color: white;
		padding: 10px;
		border-radius: 5px 0 5px 5px;
		max-width: 400px;
		margin-left: 80px;
	}


`

export {
	StyledSelfMessage
}