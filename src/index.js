import React from 'react'
import ReactDOM from 'react-dom'
import './css/polls.css'
import './css/navbar.css'
import './css/register.css'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'

const loggedIn = localStorage.getItem('token') ? true : false

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register}>
          {loggedIn && <Redirect to="/" />}
        </Route>
        <Route exact path="/login" component={Login}>
          {loggedIn && <Redirect to="/" />}
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);