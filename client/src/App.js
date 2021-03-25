// packages

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components

import Home from './components/Home/Home'
import PubIndex from './components/pub/PubIndex'
import Footer from './components/Footer'

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
      <Footer />
    </BrowserRouter>
  )
}

export default App
