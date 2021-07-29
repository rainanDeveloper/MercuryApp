import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-size: 16px;
	outline: none;
	font-family: 'Segoe UI Emoji', Roboto, -apple-system, BlinkMacSystemFont, 'Oxygen',
		'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif;
	font-weight: 400;
}

html, body {
	padding: 0;
	margin: 0;
	background-color: white;
}

input, button, a {
	padding: 8px 10px;
	border-radius: 5px;
	border: solid 1px #e4e4e4;
	background-color: white;
}

button, a {
	background-color: #2ecc71;
	border: solid 1px #27ae60;
	color: white;
	font-weight: 600;
	font-size: 1.1em;
	cursor: pointer;
	margin-top: 10px;
	transition-duration: 0.5s;
	transition-timing-function: ease-in-out;
}

a {
	text-decoration: none;
	margin-top: 0;
}

button:hover {
	filter: brightness(110%);
}


button:disabled, a:disabled {
	filter: saturate(85%) brightness(95%);
}

.input-group {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

`

export { GlobalStyles }