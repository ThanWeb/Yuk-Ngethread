import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import isPreloadReducer from './isPreload/reducer'
import threadDetailReducer from './threadDetail/reducer'
import threadsReducer from './threads/reducer'
import usersReducer from './users/reducer'
import leaderboardsReducer from './leaderboard/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threadDetail: threadDetailReducer,
    threads: threadsReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer
  }
})

export default store
