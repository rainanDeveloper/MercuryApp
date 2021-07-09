import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font: 400 16px;
	outline: none;
	font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen',
		'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif
}

html, body {
	padding: 0;
	margin: 0;
}

`

export { GlobalStyles }