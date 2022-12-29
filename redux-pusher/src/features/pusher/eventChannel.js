import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateChannel } from './eventsSlice'
import { usePusher } from '../../app/pusher'

export const TournamentPrefix = 'poker-electricpoker-v1-';

export const UpdateChannelForm = () => {
  const [tournamentId, setTournamentId] = useState('')

  const dispatch = useDispatch()
  const pusher = usePusher()

  const onTournamentIdChanged = (e) => setTournamentId(e.target.value)

  const onSubscribe = () => {
    if (tournamentId) {
      dispatch(
        updateChannel({
          updatedChannel: `${TournamentPrefix}${tournamentId}`,
          pusher,
        })
      )
    }
  }

  const canSubscribe = Boolean(tournamentId)

  return (
    <section>
      <h3>Tournament Channel</h3>
      <form>
        <label htmlFor="tournamentId">Tournament Id</label>
        <input
          type="text"
          id="tournamentId"
          name="tournamentId"
          value={tournamentId}
          placeholder="Guid"
          onChange={onTournamentIdChanged}
        />
        <button
          type="button"
          onClick={onSubscribe}
          disabled={!canSubscribe}
        >
          Subscribe
        </button>
      </form>
    </section>
  )
}
