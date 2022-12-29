import { combineReducers } from '@reduxjs/toolkit'
import eventsReducer from '../features/pusher/eventsSlice'

export const rootReducer = combineReducers({
  events: eventsReducer,
})
