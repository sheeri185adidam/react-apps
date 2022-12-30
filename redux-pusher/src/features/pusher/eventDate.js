import { formatDistanceToNow, parseISO } from 'date-fns'

export const EventDate = ({ date }) => {
  let timeAgo = ''
  if (date) {
    const parsedDate = parseISO(date)
    const timePeriod = formatDistanceToNow(parsedDate)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span>
      <i>{date}</i>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
