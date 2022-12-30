import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { AddChannelForm } from './features/pusher/eventChannel'
import { EventsList } from './features/pusher/eventsList'
import { EventChannelSubscriptions } from './features/pusher/eventChannelSubscriptions'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddChannelForm />
                <EventChannelSubscriptions />
                <EventsList />
              </React.Fragment>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
