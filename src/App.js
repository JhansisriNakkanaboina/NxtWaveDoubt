import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'
import './App.css'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const jwtToken = Cookies.get('jwt_token')
  return (
    <Route
      {...rest}
      render={props =>
        jwtToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

const PublicRoute = ({component: Component, ...rest}) => {
  const jwtToken = Cookies.get('jwt_token')
  return (
    <Route
      {...rest}
      render={props =>
        jwtToken ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

const App = () => (
  <Switch>
    <PublicRoute exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
