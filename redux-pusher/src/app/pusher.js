import Pusher from 'pusher-js'

const PusherInstance = {
  Connection: undefined,
}

export function connect(appKey, appCluster) {
  disconnect();

  PusherInstance.Connection = new Pusher(appKey, {
    cluster: appCluster,
    forceTLS: true,
    enabledTransports: ['ws', 'xhr_streaming'],
    disabledTransports: ['xhr_streaming'],
  })
}

export function disconnect() {
  if (PusherInstance.Connection) {
    PusherInstance.Connection.disconnect()
  }
}

export function subscribe(channel) {
  if (PusherInstance.Connection) {
    return PusherInstance.Connection.subscribe(channel)
  }
}

export function unsubscribe(channel) {
  if (PusherInstance.Connection) {
    return PusherInstance.Connection.unsubscribe(channel)
  }
}

export function bind(channel, event, callback) {
  const subscription = subscribe(channel)
  subscription.bind(event, callback)
}

export default PusherInstance