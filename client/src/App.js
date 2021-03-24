import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import PubIndex from './components/pub/PubIndex'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pubs">
          <PubIndex />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
