import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Chatlist} from './components/ChatList/index'

function App() {


	useEffect(() => {
		
	}, [])
	
		
		return (
			<div className="App">
				<div className="container mrgnbtm">
					<Chatlist>

					</Chatlist>
				</div>
				<footer>
					
				</footer>
			</div>
		);
}

export default App;
