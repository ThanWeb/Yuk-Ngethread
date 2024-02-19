import api from '../../utils/api'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import { showLoading, hideLoading } from '../../utils'

const asyncPopulateUsersAndThreads = () => {
  return async (dispatch) => {
    showLoading()
    try {
      const users = await api.getAllUsers()
      const threads = await api.getAllThreads()
      dispatch(receiveUsersActionCreator(users))
      dispatch(receiveThreadsActionCreator(threads))
    } catch (error) {
      alert(error.message)
    }
    hideLoading()
  }
}

export { asyncPopulateUsersAndThreads }
