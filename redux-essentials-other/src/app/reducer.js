import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

export const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer
});