import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'

const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    )
}

export { Routes }