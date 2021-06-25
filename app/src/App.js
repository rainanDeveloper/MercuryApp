import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'

function App() {


	useEffect(() => {
		
	}, [])
	
		
		return (
			<div className="App">
				<Header></Header>
				<div className="container mrgnbtm">
					Hello World from React Demo Application - By Rainan Miranda de Jesus
				</div>
				<footer>
					Removed example api
				</footer>
			</div>
		);
}

export default App;
