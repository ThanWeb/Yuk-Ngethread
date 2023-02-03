import api from '../../utils/api'

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
    GIVE_UP_VOTE_THREAD_DETAIL: 'GIVE_UP_VOTE_THREAD_DETAIL',
    GIVE_DOWN_VOTE_THREAD_DETAIL: 'GIVE_DOWN_VOTE_THREAD_DETAIL',
    GIVE_NEUTRAL_VOTE_THREAD_DETAIL: 'GIVE_NEUTRAL_VOTE_THREAD_DETAIL',
    CREATE_COMMENT_THREAD_DETAIL: 'CREATE_COMMENT_THREAD_DETAIL',
    GIVE_UP_VOTE_COMMENT_THREAD_DETAIL: 'GIVE_UP_VOTE_COMMENT_THREAD_DETAIL',
    GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL: 'GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL',
    GIVE_NEUTRAL_VOTE_COMMENT_THREAD_DETAIL: 'GIVE_NEUTRAL_VOTE_COMMENT_THREAD_DETAIL'
}

const clearThreadDetailActionCreator = () => {
    return {
        type: ActionType.CLEAR_THREAD_DETAIL
    }
}

const receiveThreadDetailActionCreator = (threadDetail) => {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
            threadDetail
        }
    }
}

const asyncReceiveThreadDetail = (threadId) => {
    return async (dispatch) => {
        dispatch(clearThreadDetailActionCreator())
        try {
            const threadDetail = await api.getDetailThread(threadId)
            dispatch(receiveThreadDetailActionCreator(threadDetail))
        } catch (error) {
            alert(error.message)
        }
    }
}

export {
    ActionType,
    clearThreadDetailActionCreator,
    receiveThreadDetailActionCreator,
    asyncReceiveThreadDetail
}
