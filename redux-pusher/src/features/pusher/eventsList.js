import { useSelector } from 'react-redux'
import { selectEvents } from './eventsSlice'

const Event = ({ event }) => {
  return (
    <article className="event">
      <h3>{event.name}</h3>
      <p className="event-data">{JSON.stringify(event.data) ?? ""}</p>
    </article>
  )
}

export const EventsList = () => {
  const events = useSelector(selectEvents)

  const eventsList = events.map((event) => {
    return <Event key={event.id} event={event} />
  });

  return (
    <section className="events-list">
      <h2>Events</h2>
      {eventsList}
    </section>
  );
}
