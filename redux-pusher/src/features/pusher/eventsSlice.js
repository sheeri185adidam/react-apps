import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

const MAX_EVENTS = 100

export const updateChannel = createAsyncThunk(
  'events/updateChannel',
  async ({ updatedChannel, pusher}, { dispatch, getState }) => {
    const currentChannel = selectChannel(getState());

    if (currentChannel) {
      pusher.unsubscribe(currentChannel);
    }

    if (updatedChannel) {
      const pusherChannel = pusher.subscribe(updatedChannel)

      pusherChannel.bind('TournamentUpdatedPush', (data) => {
        dispatch(addEvent(data))
      })
    }

    return Promise.resolve(updatedChannel);
  }
)

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    channel: '',
    events: [],
    iterator: 0,
  },
  reducers: {
    addEvent(state, action) {
      const iterator = state.iterator % MAX_EVENTS
      state.events[iterator] = {
        id: nanoid(),
        name: 'TournamentUpdatedPush',
        data: action.payload ?? {},
      }
      state.iterator = iterator + 1
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateChannel.fulfilled, (state, action) => {
      state.channel = action.payload
    })
  },
})

export const selectChannel = (state) => state.events.channel
export const selectEvents = (state) => state.events.events

export const { addEvent } = eventsSlice.actions

export default eventsSlice.reducer
