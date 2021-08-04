import styled from "styled-components";


const StyledChatMessageList = styled.div`
	width: 100%;
	display: grid;
	grid-template-rows: auto 2fr auto;

	.currentChatInfo {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		gap: 10px;
		background: ${props=>props.theme.backgroundLight};

		div.currentChatAvatar {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
`

export { StyledChatMessageList }