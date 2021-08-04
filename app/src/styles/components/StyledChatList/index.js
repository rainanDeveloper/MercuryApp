import styled from "styled-components";


const StyledChatList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	margin: 0;
	border: 0;
	border-top: solid 1px ${props=>props.theme.inputBorder};
	position: relative;

	li {
		display: flex;
		flex-direction: column;
	}

	li a {
		background-color: transparent;
		border: none;
		padding: 0;
		margin: 0;
	}

	li:hover {
		background: #eeeeee22;
		transition: none;
	}

	li.active {
		background: ${props=>props.theme.backgroundLight};
		color: ${props=>props.theme.textColor};
	}
`

export { StyledChatList }