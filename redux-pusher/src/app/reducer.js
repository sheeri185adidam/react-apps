import { combineReducers } from '@reduxjs/toolkit'
import eventsReducer from '../features/events/eventsSlice'
import pusherReducer from '../features/pusher/pusherSlice'

export const rootReducer = combineReducers({
  events: eventsReducer,
  pusher: pusherReducer,
})
