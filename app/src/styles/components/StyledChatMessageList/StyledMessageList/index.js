import styled from 'styled-components';


const StyledMessageList = styled.section`
	display: flex;
	align-items: flex-end;
	width: 100%;
	gap: 15px;
	flex-grow: 1;
	padding-bottom: 10px;
	overflow-y: scroll;
	overflow-x: hidden;

	ul {
		width: 100%;
		display: flex;
		flex-direction: column;
		list-style: none;
		gap: 5px;

		li {
			width: 100%;
		}
	}

`

export {
	StyledMessageList
}