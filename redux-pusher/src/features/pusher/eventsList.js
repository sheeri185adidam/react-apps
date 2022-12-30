import { useDispatch, useSelector } from 'react-redux'
import { clearEvents, selectEvents } from './eventsSlice'
import { useState } from 'react'

import { EventDate } from './eventDate'

const EventData = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

const Event = ({ event }) => {
    const emoji = '👀';
  const [expanded, setExpanded] = useState(false)

  let button = ''
  if (expanded) {
    button = 'Hide Details'
  } else{
    button = 'Show Details'
  }
  return (
    <article className="post-excerpt">
      <header>
        <h3 onClick={() => setExpanded(!expanded)}>{event.name}</h3>
        <div>
          <EventDate date={event.receivedAt} />
        </div>
        <p className="post-content">
          <span className="post-reason">{event.data.updateReason}</span>
        </p>
      </header>
      {expanded && <EventData className="post-content" data={event.data} />}
      <button
        className="muted-button  reaction-button"
        onClick={() => setExpanded(!expanded)}
      >
        {emoji} {button}
      </button>
    </article>
  )
}

export const EventsList = () => {
  const events = useSelector(selectEvents)
  const dispatch = useDispatch()

  const eventsList = events.map((event) => {
    return <Event key={event.id} event={event} />
  })

  const onConsoleCleared = () => {
    dispatch(clearEvents())
  }

  return (
    <section className="posts-list">
      <h3>Push Events</h3>
      <button className="muted-button  reaction-button" onClick={(e) => onConsoleCleared()}>{'❌'} Clear</button>
      {eventsList}
    </section>
  )
}
