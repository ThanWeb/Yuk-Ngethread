import api from '../../utils/api'

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
    try {
      const leaderboards = await api.getLeaderboards()
      dispatch(receiveLeaderboardsActionCreator(leaderboards))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards
}
