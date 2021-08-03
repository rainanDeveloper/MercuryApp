
import styled from 'styled-components';


const StyledHome = styled.main`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 15px;
	background: white;
	color: #000;


	header {
		display: flex;
		flex-direction: row;
		gap: 10px;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 1200px;
		
		h1 {
			font-size: 1.8em;
			font-weight: 300;
		}

		.initialPageButtons {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 10px
		}
	}
`

export { StyledHome }