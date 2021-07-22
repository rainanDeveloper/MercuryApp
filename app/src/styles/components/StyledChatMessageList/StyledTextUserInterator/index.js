
import styled from 'styled-components';


const StyledTextUserInterator = styled.section`
	display: flex;
	width: 100%;
	height: 80px;
	padding: 10px;
	align-items: center;
	border-top: 1px solid #ccc;
	gap: 15px;

	button {
		background: transparent;
		color: #2c3e50;
		border: none;
	}

	textarea {
		border: none;
		background: #dcdde1;
		resize: none;
		padding: 15px;
		flex-grow: 1;
		border-radius: 20px;
	}
`

export {
	StyledTextUserInterator
}