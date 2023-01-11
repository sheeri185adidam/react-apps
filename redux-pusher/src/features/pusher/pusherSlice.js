import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Pusher from 'pusher-js'

export var PusherConnection = undefined

export const addApp = createAsyncThunk(
  'pusher/addApp',
  async ({ appKey, appCluster }, { dispatch, getState }) => {
    if (appKey && appCluster) {
      const connection = selectPusherApp(getState())
      if (connection.appKey && connection.appCluster) {
        PusherConnection.Connection?.disconnect()
      }

      window.PusherConnection = new Pusher(appKey, {
        cluster: appCluster,
        forceTLS: true,
        enabledTransports: ['ws', 'xhr_streaming'],
        disabledTransports: ['xhr_streaming'],
      })

      return Promise.resolve({ appKey, appCluster })
    }
  }
)

const pusherSlice = createSlice({
  name: 'pusher',
  initialState: {
    pusher: {
      appKey: '',
      appCluster: '',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addApp.fulfilled, (state, action) => {
      state.pusher = {
        ...action.payload,
      }
    })
  },
})

export const selectPusherApp = (state) => state.pusher.pusher
export default pusherSlice.reducer
