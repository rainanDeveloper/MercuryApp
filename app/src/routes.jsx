import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    )
}

export { Routes }