import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'


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

	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: #88888877;
	}
}

html, body {
	padding: 0;
	margin: 0;
	background-color: ${props=>props.theme.background};
	color: ${props=>props.theme.textColor}
}

input, button, a {
	padding: 8px 10px;
	border-radius: 5px;
	border: solid 1px ${props=>props.theme.inputBorder};
	background-color:  ${props=>props.theme.background};
	color: ${props=>props.theme.textColor};
	::placeholder {
		color: ${props=>props.theme.textColor};
		opacity: 0.6;
	}

}

button, a {
	background-color: ${colors.primary};
	border: solid 1px ${colors.primaryDark};
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