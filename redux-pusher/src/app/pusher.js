import Pusher from 'pusher-js'

const pusherConfig = {
  app_id: '',
  key: '',
  secret: '',
  cluster: '',
}

const pusher = new Pusher(pusherConfig.key, {
  cluster: pusherConfig.cluster,
  forceTLS: true,
  enabledTransports: ['ws', 'xhr_streaming'],
  disabledTransports: ['xhr_streaming'],
})

export default pusher;
