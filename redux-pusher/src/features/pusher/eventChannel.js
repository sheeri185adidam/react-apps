import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateChannel } from './eventsSlice'
import { usePusher } from '../../app/pusher'

export const UpdateChannelForm = () => {
  const tournamentPrefix = 'poker-electricpoker-v1-'
  const [tournamentId, setTournamentId] = useState('')
  const dispatch = useDispatch()
  const pusher = usePusher()

  const onTournamentIdChanged = (e) => setTournamentId(e.target.value)

  const onSaveTournamentId = () => {
    if (tournamentId) {
      dispatch(
        updateChannel({
          updatedChannel: `${tournamentPrefix}${tournamentId}`,
          pusher,
        })
      )
      setTournamentId('')
    }
  }

  const canSubscribe = Boolean(tournamentId)

  return (
    <section>
      <h2>Tournament Channel</h2>
      <form>
        <label htmlFor="tournamentId">{tournamentPrefix}</label>
        <input
          type="text"
          id="tournamentId"
          name="tournamentId"
          value={tournamentId}
          onChange={onTournamentIdChanged}
        />
        <button
          type="button"
          onClick={onSaveTournamentId}
          disabled={!canSubscribe}
        >
          Subscribe
        </button>
      </form>
    </section>
  )
}
