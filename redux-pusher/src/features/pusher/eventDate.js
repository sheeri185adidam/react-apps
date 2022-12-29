import { formatDistanceToNow, parseISO } from 'date-fns'

export const EventDate = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span>
      <i>{timestamp}</i>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
