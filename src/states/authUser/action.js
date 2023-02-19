import api from '../../utils/api'
import { showLoading, hideLoading } from '../../utils'

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
        showLoading()
        try {
            const token = await api.login({ email, password })
            api.putAccessToken(token)
            const authUser = await api.getOwnProfile()
            dispatch(setAuthUserActionCreator(authUser))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

const asyncUnsetAuthUser = () => {
    return (dispatch) => {
        showLoading()
        dispatch(unsetAuthUserActionCreator())
        api.putAccessToken('')
        hideLoading()
    }
}

export {
    ActionType,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator,
    asyncSetAuthUser,
    asyncUnsetAuthUser
}
