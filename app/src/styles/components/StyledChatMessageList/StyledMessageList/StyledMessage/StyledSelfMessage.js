import styled from "styled-components";
import { colors } from "../../../../colors";


const StyledSelfMessage = styled.div`
	text-align: right;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	flex-direction: column;
	margin-right: 50px;

	div {
		flex-direction: column;
		background: ${colors.secondary};
		color: white;
		position: relative;
		padding: 10px;
		border-radius: 5px;
		border-bottom-right-radius: 0;
		max-width: 400px;
		margin-left: 80px;
		padding-right: 40px;

		span.timestamp{
			position: absolute;
			font-size: 0.6em;
			color: ${colors.metadata};
			bottom: 5px;
			right: 5px;
		}

		::after {
			content: '';
			position: absolute;
			bottom: 0;
			right: -10px;
			border: solid 10px transparent;
			border-bottom: solid 10px ${colors.secondary};
			z-index: 1
		}
	}


`

export {
	StyledSelfMessage
}