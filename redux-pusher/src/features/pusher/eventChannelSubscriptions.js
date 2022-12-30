import { useDispatch, useSelector } from 'react-redux'
import { removeChannel, selectChannels } from './eventsSlice'

const EventChannelSubscription = ({ channel }) => {
  const dispatch = useDispatch()
  const OnUnsubscribe = () => {
    dispatch(removeChannel({ channel }))
  }
  return (
    <div className="subscription">
      <label>{channel}</label>
      <button className="reaction-button" onClick={(e) => OnUnsubscribe()}>
        {'🔕'}{'unsubscribe'}
      </button>
    </div>
  )
}

export const EventChannelSubscriptions = () => {
  const channels = useSelector(selectChannels)

  let subscribedChannels = undefined
  if (channels && channels.length > 0) {
    subscribedChannels = channels.map((channel) => {
      return <EventChannelSubscription key={channel} channel={channel} />
    })
  }

  return (
    <section>
      <h5>Subscribed Channels:</h5>
      {subscribedChannels}
    </section>
  )
}
