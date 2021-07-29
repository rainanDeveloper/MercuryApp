import styled from 'styled-components';


const StyledMessageList = styled.section`
	display: flex;
	height: 100%;
	width: 100%;
	gap: 15px;
	flex-grow: 1;
	padding-bottom: 10px;
	overflow-y: scroll;
	
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: #88888877;
	}

	ul {
		width: 100%;
		display: flex;
		flex-direction: column;
		list-style: none;
		gap: 5px;
		min-height: 100%;
		height: fit-content;

		li {
			width: 100%;
		}
	}

`

export {
	StyledMessageList
}