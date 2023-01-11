import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addChannel } from './eventsSlice'

export const AddChannelForm = () => {
  const [channel, setChannel] = useState('')

  const dispatch = useDispatch()

  const onChannelChanged = (e) => setChannel(e.target.value)

  const onSubscribe = () => {
    if (channel) {
      dispatch(
        addChannel({ channel })
      )

      setChannel('')
    }
  }

  const canSubscribe = Boolean(channel)

  return (
    <section>
      <form>
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          value={channel}
          placeholder="channel name"
          onChange={onChannelChanged}
        />
        <button type="button" onClick={onSubscribe} disabled={!canSubscribe}>
          {'🔔'}{'subscribe'}
        </button>
      </form>
    </section>
  )
}
