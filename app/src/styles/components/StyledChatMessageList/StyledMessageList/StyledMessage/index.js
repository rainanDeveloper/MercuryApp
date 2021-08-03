import styled from "styled-components";


const StyledMessage = styled.div`
	text-align: left;
	align-items: flex-start;
	display: flex;
	flex-direction: column;
	margin-left: 10px;

	span {
		color: ${props=>props.theme.spanTextColor};
		font-weight: 600;
		margin-bottom: 5px;
	}

	div {
		display: flex;
		align-items: flex-start;

		div {
			flex-direction: column;
			position: relative;
			background: ${props=>props.theme.backgroundLight};
			padding: 10px;
			border-radius: 5px;
			border-bottom-left-radius: 0;
			max-width: 400px;
			padding-right: 40px;
			margin-right: 80px;

			span.timestamp{
				position: absolute;
				font-size: 0.6em;
				color: #888;
				bottom: 0;
				right: 5px;
			}

			::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: -10px;
				border: solid 10px transparent;
				border-bottom: solid 10px ${props=>props.theme.backgroundLight};
				z-index: 1
			}
		}
	}


`

export {
	StyledMessage
}