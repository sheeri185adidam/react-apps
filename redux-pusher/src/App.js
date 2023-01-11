import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { AddChannelForm } from './features/events/eventChannel'
import { EventsList } from './features/events/eventsList'
import { EventChannelSubscriptions } from './features/events/eventChannelSubscriptions'
import { PusherApp } from './features/pusher/pusherApp'
import { PusherAppSubscription } from './features/pusher/pusherAppSubscription'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/app"
            render={() => (
              <React.Fragment>
                <PusherApp />
                <PusherAppSubscription />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/events"
            render={() => (
              <React.Fragment>
                <AddChannelForm />
                <EventChannelSubscriptions />
                <EventsList />
              </React.Fragment>
            )}
          />
          <Redirect to="/app" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
