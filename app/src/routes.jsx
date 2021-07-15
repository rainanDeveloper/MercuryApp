import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'

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
                <Route exact path="/signup" component={SignUp}/>
            </Switch>
        </BrowserRouter>
    )
}

export { Routes }