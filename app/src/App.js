import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { getDemoApi } from './services/DemoService'

function App() {

	const [apiData, setApiData] = useState('')


	useEffect(() => {
		getDemoApi()
		.then(data => {
			console.log(data)
			setApiData(data.message)
		})
	}, [])
	
		
		return (
			<div className="App">
				<Header></Header>
				<div className="container mrgnbtm">
					Hello World from React Demo Application - By Rainan Miranda de Jesus
				</div>
				<footer>
					{apiData}
				</footer>
			</div>
		);
}

export default App;
