import api from '../../utils/api'
import { showLoading, hideLoading } from '../../utils'

const ActionType = {
    RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS'
}

const receiveLeaderboardsActionCreator = (leaderboards) => {
    return {
        type: ActionType.RECEIVE_LEADERBOARDS,
        payload: {
            leaderboards
        }
    }
}

const asyncReceiveLeaderboards = () => {
    return async (dispatch) => {
        showLoading()
        try {
            const leaderboards = await api.getLeaderboards()
            dispatch(receiveLeaderboardsActionCreator(leaderboards))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

export {
    ActionType,
    receiveLeaderboardsActionCreator,
    asyncReceiveLeaderboards
}
