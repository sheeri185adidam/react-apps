import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import Pusher from 'pusher-js'
import PusherConfig from './pusher.config'
import { PusherProvider } from './app/pusher'
import { UpdateChannelForm } from './features/pusher/eventChannel'
import { EventsList } from './features/pusher/eventsList'
import { EventChannelSubscription } from './features/pusher/eventChannelSubscription'

Pusher.logToConsole = true

// Set up pusher instance with main channel subscription
// Be able to subscribe to the same channel in another component
// with separate callback but utilizing the existing connection
const pusher = new Pusher(PusherConfig.key, {
  cluster: PusherConfig.cluster,
  forceTLS: true,
  enabledTransports: ['ws', 'xhr_streaming'],
  disabledTransports: ['xhr_streaming']
})

function App() {
  return (
    <PusherProvider pusher={pusher}>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  <UpdateChannelForm />
                  <EventChannelSubscription />
                  <EventsList />
                </React.Fragment>
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </PusherProvider>
  )
}

export default App
