import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Routes } from './routes'
import { GlobalStyles } from './styles/GlobalStyles'

import {themes} from './styles/themes'

function App() {

	const [theme, setTheme] = useState('light')

	useEffect(()=>{
		const darkThemeMatcher = window.matchMedia("(prefers-color-scheme: dark)")

		const storagedTheme = localStorage.getItem('theme')

		if(storagedTheme){
			setTheme(storagedTheme)
		}
		else{
			if(darkThemeMatcher.matches){
				setTheme('dark')
			}
			else{
				setTheme('light')
			}
		}
	}, [])

	function themeSwitcher(event){
		event.preventDefault()

		setTheme(theme=>{
			if(theme=='light'){
				localStorage.setItem('theme', 'dark')
				return 'dark'
			}
			else{
				localStorage.setItem('theme', 'dark')
				return 'dark'
			}
		})
	}

	return <ThemeProvider theme={themes[theme]||themes['light']}>
			<Routes/>
			<GlobalStyles/>
		</ThemeProvider>
}

export { App }
