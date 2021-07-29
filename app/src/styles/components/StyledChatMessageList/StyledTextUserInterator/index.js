
import styled from 'styled-components';


const StyledTextUserInterator = styled.section`
	display: flex;
	width: 100%;
	min-height: 60px;
	max-height: max-content;
	flex-shrink: 2;
	height: fit-content;
	padding: 10px;
	align-items: flex-start;
	border-top: 1px solid #ccc;
	gap: 15px;
	
	button {
		background: transparent;
		color: #2c3e50;
		border: none;
		margin-top: 0;
	}

	.tooltipContainer {
		display: flex;
		flex: 1 1 auto;
		position: relative;
		margin: 0;
		overflow: show;


		.text {
			display: flex;
			flex: 1 1 auto;
			background: #dcdde1;
			border-radius: 10px;
			border-bottom-right-radius: 0;
			overflow: hidden;
			padding: 15px;
			padding-right: 0;

			.textContainer {
				display: flex;
				max-height: 249px;
				height: fit-content;
				justify-content: stretch;
				align-items: flex-start;
				border: none;
				flex-grow: 1;
				margin-right: 10px;
				gap: 10px;
				overflow: auto;

				textarea {
					height: fit-content;
					display: flex;
					background: transparent;
					border: none;
					resize: none;
					flex-grow: 1;
					font-size: 16px !important;
				}
			}
		}


		::after {
			content: '';
			position: absolute;
			bottom: 0;
			right: -15px;
			border: solid 15px transparent;
			border-bottom: solid 15px #dcdde1;
			z-index: 1
		}
	}

	
	
	
`

export {
	StyledTextUserInterator
}