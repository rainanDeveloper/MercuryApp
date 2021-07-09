import styled from "styled-components";


const StyledChatList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	margin: 0;
	border: 0;
	border-top: solid 1px #ccc;

	li {
		display: flex;
		flex-direction: column;
	}
`

export { StyledChatList }