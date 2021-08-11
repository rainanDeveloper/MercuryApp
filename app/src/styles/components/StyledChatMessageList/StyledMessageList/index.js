import styled from 'styled-components';


const StyledMessageList = styled.section`
	display: flex;
	height: 100%;
	width: 100%;
	gap: 15px;
	padding-bottom: 10px;
	overflow-y: scroll;
	flex-direction: column;
	justify-content: flex-end;

	ul {
		width: 100%;
		display: flex;
		flex-direction: column;
		list-style: none;
		gap: 5px;
		min-height: 100%;
		height: fit-content;

		padding-top: 90%;
		margin-bottom: 10px;

		li {
			width: 100%;
		}

		div.scrollComponent {
			padding: 5px;
		}
	}

`

export {
	StyledMessageList
}