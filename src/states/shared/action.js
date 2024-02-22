import api from '../../utils/api'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'

const asyncPopulateUsersAndThreads = () => {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers()
      const threads = await api.getAllThreads()
      dispatch(receiveUsersActionCreator(users))
      dispatch(receiveThreadsActionCreator(threads))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

export { asyncPopulateUsersAndThreads }
