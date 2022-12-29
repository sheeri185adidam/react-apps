import { useSelector } from 'react-redux'
import { selectEvents } from './eventsSlice'
import { useState } from 'react'

import { EventDate } from './eventDate'

const EventData = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

const Event = ({ event }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <article className="post-excerpt">
      <header>
        <h3 onClick={() => setExpanded(!expanded)}>TournamentUpdatedPush</h3>
        <div>
          <EventDate timestamp={event.data.createdAt} />
        </div>
        <p className="post-content">
          <span className="post-reason">{event.data.updateReason}</span>
        </p>
      </header>
      {expanded && <EventData className="post-content" data={event.data} />}
      <button
        className="button muted-button"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide Details' : 'Show Details'}
      </button>
    </article>
  )
}

export const EventsList = () => {
  const events = useSelector(selectEvents)

  const eventsList = events.map((event) => {
    return <Event key={event.id} event={event} />
  })

  return (
    <section className="posts-list">
      <h3>Events</h3>
      {eventsList}
    </section>
  )
}
