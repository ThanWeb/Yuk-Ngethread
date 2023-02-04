import { ActionType } from './action'

const threadDetailReducer = (threadDetail = null, action = {}) => {
    switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
        return action.payload.threadDetail
    case ActionType.CLEAR_THREAD_DETAIL:
        return null
    case ActionType.CREATE_COMMENT_THREAD_DETAIL:
        return { ...threadDetail, comments: [action.payload.comment, ...threadDetail.comments] }
    default:
        return threadDetail
    }
}

export default threadDetailReducer
