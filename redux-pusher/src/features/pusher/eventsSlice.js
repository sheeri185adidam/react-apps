import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

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
    channel: null,
    events: []
  },
  reducers: {
    addEvent(state, action) {
      state.events.push({
        id: nanoid(),
        name: 'TournamentUpdatedPush',
        data: action.payload ?? {
            createdAt: new Date().getTime()
        },
      })

      state.events.sort((aEvent, bEvent) => {
        const timestampA = new Date(aEvent.data.createdAt)
        const timestampB = new Date(bEvent.data.createdAt)

        return timestampB - timestampA;
      })
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
