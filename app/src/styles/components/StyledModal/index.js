
import styled from 'styled-components';

const StyledModal = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: #88888855;
	padding: 10px;
	z-index: 3;

	div.modal {
		position: relative;
		background: white;
		padding: 10px;
		max-width: 450px;
		width: 100%;
		border-radius: 10px;


		div.title {
			padding: 10px;
			border-bottom: solid 1px #ccc;
			font-size: 1.2em;
			color: #888;

			.close {
				display: flex;
				position: absolute;
				top: 0;
				right: 0;
				margin: 0;
				padding: 8px;
				background: transparent;
				color: #ccc;
				border: none;
			}
		}

		div.footer {
			display: flex;
			padding: 10px;
			flex-direction: row;
			justify-content: flex-end;
		}
	}

`


export {
	StyledModal
}