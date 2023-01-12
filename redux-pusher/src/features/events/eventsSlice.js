import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { subscribe } from '../../app/pusher'

export const addChannel = createAsyncThunk(
  'events/addChannel',
  async ({ channel }, { dispatch, getState }) => {
    if (channel) {
      const existingChannels = selectChannels(getState())
      if (existingChannels.indexOf(channel) < 0) {
        const pusherChannel = subscribe(channel)
        pusherChannel.bind_global((event, data) => {
          dispatch(addEvent({ event, data }))
        })

        return Promise.resolve(channel)
      } else {
        return Promise.reject(new Error('channel is already subscribed'))
      }
    }
  }
)

export const removeChannel = createAsyncThunk(
  'events/removeChannel',
  async ({ channel }, { _, getState }) => {
    if (channel) {
      const existingChannels = selectChannels(getState())
      if (existingChannels.indexOf(channel) > -1) {
        window.PusherConnection.unsubscribe(channel)

        return Promise.resolve(channel)
      } else {
        return Promise.reject(new Error('channel is not subscribed'))
      }
    }
  }
)

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    channels: [],
    events: [],
  },
  reducers: {
    addEvent(state, action) {
      state.events.push({
        id: nanoid(),
        name: action.payload.event,
        data: action.payload.data,
        receivedAt: new Date().toISOString(),
      })

      state.events.sort((aEvent, bEvent) => {
        const dateA = new Date(aEvent.receivedAt)
        const dateB = new Date(bEvent.receivedAt)

        return dateB - dateA
      })
    },
    clearEvents(state, action) {
      state.events = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload)
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const index = state.channels.indexOf(action.payload)
        if (index > -1) {
          state.channels.splice(index, 1)
        }
      })
  },
})

export const selectChannels = (state) => state.events.channels
export const selectEvents = (state) => state.events.events

export const { addEvent, clearEvents } = eventsSlice.actions

export default eventsSlice.reducer
