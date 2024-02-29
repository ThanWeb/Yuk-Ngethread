import api from '../../utils/api'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '../isLoading/action'

const asyncPopulateUsersAndThreads = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingTrueActionCreator())
      const users = await api.getAllUsers()
      const threads = await api.getAllThreads()
      dispatch(receiveUsersActionCreator(users))
      dispatch(receiveThreadsActionCreator(threads))
      dispatch(setLoadingFalseActionCreator())
    } catch (error) {
      return api.handleError(error)
    }
  }
}

export { asyncPopulateUsersAndThreads }
