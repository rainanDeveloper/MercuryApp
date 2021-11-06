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

	.searchHeader {
		display: grid;
		padding: 10px;
		border-bottom: solid 1px ${props=>props.theme.inputBorder};
		grid-template-columns: 1fr 40px;
		grid-gap: 10px;
		align-items: center;

		.input-group {
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: stretch;
			align-items: stretch;

			input {
				background: ${props=>props.theme.backgroundLight};
				color: ${props=>props.theme.textColor};
				width: 100%;
				border-radius: 120px;
				padding: 8px 35px 8px 14px;
			}

			button {
				display: flex;
				box-sizing: border-box;
				position: absolute;
				right: 0;
				align-items: center;
				justify-content: center;
				background: transparent;
				border: none;
				margin: 0;
				border-radius: 50%;
				width: 35px;
				height: 35px;
			}
		}

		.menu {
			display: inline-block;
			position: relative;
			overflow: visible;
			word-wrap: keep-all;
			word-break: keep-all;
			white-space: nowrap;

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40px;
				height: 40px;
				margin: 0;
				background: transparent;
				border-radius: 50%;
				border: none;
			}

			ul {
				display: none;
				flex-direction: column;
				width: max-content;
				position: absolute;
				top: 40px;
				right: 0;
				z-index: 1;
				background: ${props => props.theme.backgroundLight};

				li {
					display: flex;
					width: 100%;

					button {
						display: flex;
						width: max-content;
						gap: 10px;
					}
				}
			}

			ul.active {
				display: flex;
			}
		}

	}
`

export { StyledChatList }