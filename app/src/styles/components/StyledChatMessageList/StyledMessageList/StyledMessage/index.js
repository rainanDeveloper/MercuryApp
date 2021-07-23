import styled from "styled-components";


const StyledMessage = styled.div`
	text-align: left;
	align-items: flex-start;
	display: flex;
	flex-direction: column;
	margin-left: 10px;

	span {
		color: #2c3e50;
		font-weight: 600;
		margin-bottom: 10px;
	}

	div {
		display: flex;
		align-items: flex-start;

		div {
			flex-direction: column;
			background: #dcdde1;
			padding: 10px;
			border-radius: 0 5px 5px 5px;
			max-width: 400px;
		}
	}


`

export {
	StyledMessage
}