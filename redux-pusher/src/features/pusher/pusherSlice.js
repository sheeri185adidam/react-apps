import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { connect, disconnect } from '../../app/pusher'

export const addApp = createAsyncThunk(
  'pusher/addApp',
  async ({ appKey, appCluster }, { dispatch, getState }) => {
    if (appKey && appCluster) {
      const connection = selectPusherApp(getState())
      if (connection.appKey && connection.appCluster) {
        disconnect()
      }

      connect(appKey, appCluster)
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
