
import styled from 'styled-components';


const StyledTextUserInterator = styled.section`
	display: flex;
	width: 100%;
	min-height: 80px;
	padding: 10px;
	align-items: center;
	border-top: 1px solid #ccc;
	gap: 15px;

	button {
		background: transparent;
		color: #2c3e50;
		border: none;
	}

	.textContainer {
		display: flex;
		justify-content: stretch;
		align-items: flex-start;
		padding: 15px;
		background: #dcdde1;
		border: none;
		flex-grow: 1;
		border-radius: 20px;
		min-height: 50px;

		textarea {
			background: transparent;
			border: none;
			resize: none;
			flex-grow: 1;
			font-family: 'Helvetica', Roboto;
		}

		.sendBtn {
			padding: 0;
			margin: 0;
		}
	}
`

export {
	StyledTextUserInterator
}