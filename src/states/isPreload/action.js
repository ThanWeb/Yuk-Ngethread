import api from '../../utils/api'
import { setAuthUserActionCreator } from '../authUser/action'
import { showLoading, hideLoading } from '../../utils'

const ActionType = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

const setIsPreloadActionCreator = (isPreload) => {
    return {
        type: ActionType.SET_IS_PRELOAD,
        payload: {
            isPreload
        }
    }
}

const asyncPreloadProcess = () => {
    return async (dispatch) => {
        showLoading()
        try {
            const authUser = await api.getOwnProfile()
            dispatch(setAuthUserActionCreator(authUser))
        } catch (error) {
            dispatch(setAuthUserActionCreator(null))
        } finally {
            dispatch(setIsPreloadActionCreator(false))
        }
        hideLoading()
    }
}

export {
    ActionType,
    setIsPreloadActionCreator,
    asyncPreloadProcess
}
