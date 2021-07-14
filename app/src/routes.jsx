import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

const Routes = ()=>{

	const authtoken = localStorage.getItem('authtoken')

	var initialPage = Home

	if(authtoken){
		initialPage = Dashboard
	}

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={initialPage}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    )
}

export { Routes }