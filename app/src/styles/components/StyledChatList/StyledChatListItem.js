import styled from "styled-components";

const StyledChatListItem = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr;
	justify-content: stretch;
	grid-gap: 10px;
	padding: 10px;
	border-bottom: solid 1px ${props=>props.theme.inputBorder};
	cursor: pointer;

	div.chatPic {
		display: flex;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
	}

	div.chatPic img{
		display: flex;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	div.chatTitle {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	div.chatTitle span {
		font-weight: 600;
		font-size: 1.1em;
		color: ${props=>props.theme.spanTextColor}
	}
`

export {StyledChatListItem}