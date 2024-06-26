import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import NotFound from './components/NotFound'
import TeamMatches from './components/TeamMatches'

const App = () => (
  <BrowserRouter>
    <div className="back-ground">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/team-matches/:id" component={TeamMatches} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App
