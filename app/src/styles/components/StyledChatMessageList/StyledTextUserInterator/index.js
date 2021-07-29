
import styled from 'styled-components';


const StyledTextUserInterator = styled.section`
	display: flex;
	flex-wrap:wrap;
	width: 100%;
	min-height: 60px;
	height: fit-content;
	padding: 10px;
	align-items: center;
	border-top: 1px solid #ccc;
	gap: 15px;
	
	button {
		background: transparent;
		color: #2c3e50;
		border: none;
		margin-top: 0;
	}
	
	.textContainer {
		display: flex;
		max-height: 25vh;
		justify-content: stretch;
		align-items: flex-start;
		padding: 15px;
		background: #dcdde1;
		border: none;
		flex-grow: 1;
		border-radius: 20px;
		min-height: 50px;
		gap: 10px;
		overflow: auto;

		textarea {
			background: transparent;
			border: none;
			resize: none;
			flex-grow: 1;
			font-size: 16px !important;
		}

		.sendBtn {
			padding: 0;
			margin: 0;
			width: 20px;
			height: 20px;
		}
	}
`

export {
	StyledTextUserInterator
}