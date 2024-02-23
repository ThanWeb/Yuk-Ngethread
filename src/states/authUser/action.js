import api from '../../utils/api'
import { setMessageActionCreator } from '../message/action'

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
}

const setAuthUserActionCreator = (authUser = null) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  }
}

const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null
    }
  }
}

const asyncSetAuthUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.login({ email, password })

      if (status !== 'fail') {
        api.putAccessToken(data.token)
        const authUser = await api.getOwnProfile()
        dispatch(setAuthUserActionCreator(authUser))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncUnsetAuthUser = () => {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator())
    api.putAccessToken('')
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
}
