import api from '../../utils/api'
import { showLoading, hideLoading } from '../../utils'

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
    GIVE_UP_VOTE_THREAD_DETAIL: 'GIVE_UP_VOTE_THREAD_DETAIL',
    GIVE_DOWN_VOTE_THREAD_DETAIL: 'GIVE_DOWN_VOTE_THREAD_DETAIL',
    // GIVE_NEUTRAL_VOTE_THREAD_DETAIL: 'GIVE_NEUTRAL_VOTE_THREAD_DETAIL',
    CREATE_COMMENT_THREAD_DETAIL: 'CREATE_COMMENT_THREAD_DETAIL',
    GIVE_UP_VOTE_COMMENT_THREAD_DETAIL: 'GIVE_UP_VOTE_COMMENT_THREAD_DETAIL',
    GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL: 'GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL'
    // GIVE_NEUTRAL_VOTE_COMMENT_THREAD_DETAIL: 'GIVE_NEUTRAL_VOTE_COMMENT_THREAD_DETAIL'
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

const createCommentActionCreator = (comment) => {
    return {
        type: ActionType.CREATE_COMMENT_THREAD_DETAIL,
        payload: {
            comment
        }
    }
}

const giveUpVoteDetailActionCreator = (vote) => {
    return {
        type: ActionType.GIVE_UP_VOTE_THREAD_DETAIL,
        payload: {
            vote
        }
    }
}

const giveDownVoteDetailActionCreator = (vote) => {
    return {
        type: ActionType.GIVE_DOWN_VOTE_THREAD_DETAIL,
        payload: {
            vote
        }
    }
}

const giveUpVoteCommentActionCreator = ({ commentId, vote }) => {
    return {
        type: ActionType.GIVE_UP_VOTE_COMMENT_THREAD_DETAIL,
        payload: {
            commentId,
            vote
        }
    }
}

const giveDownVoteCommentActionCreator = ({ commentId, vote }) => {
    return {
        type: ActionType.GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL,
        payload: {
            commentId,
            vote
        }
    }
}

const asyncReceiveThreadDetail = (threadId) => {
    return async (dispatch) => {
        showLoading()
        dispatch(clearThreadDetailActionCreator())
        try {
            const threadDetail = await api.getDetailThread(threadId)
            dispatch(receiveThreadDetailActionCreator(threadDetail))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

const asyncCreateComment = ({ content, id }) => {
    return async (dispatch) => {
        showLoading()
        try {
            const comment = await api.createCommentThread({ content, id })
            dispatch(createCommentActionCreator(comment))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

const asyncGiveUpVoteDetail = (id) => {
    return async (dispatch) => {
        showLoading()
        try {
            const vote = await api.giveUpVoteThread(id)
            dispatch(giveUpVoteDetailActionCreator(vote))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

const asyncGiveDownVoteDetail = (id) => {
    return async (dispatch) => {
        showLoading()
        try {
            const vote = await api.giveDownVoteThread(id)
            dispatch(giveDownVoteDetailActionCreator(vote))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

const asyncGiveUpVoteComment = ({ threadId, commentId }) => {
    return async (dispatch) => {
        showLoading()
        try {
            const vote = await api.giveUpVoteComment({ threadId, commentId })
            dispatch(giveUpVoteCommentActionCreator({ commentId, vote }))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

const asyncGiveDownVoteComment = ({ threadId, commentId }) => {
    return async (dispatch) => {
        showLoading()
        try {
            const vote = await api.giveDownVoteComment({ threadId, commentId })
            dispatch(giveDownVoteCommentActionCreator({ commentId, vote }))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

export {
    ActionType,
    clearThreadDetailActionCreator,
    receiveThreadDetailActionCreator,
    createCommentActionCreator,
    giveUpVoteDetailActionCreator,
    giveDownVoteDetailActionCreator,
    giveUpVoteCommentActionCreator,
    giveDownVoteCommentActionCreator,
    asyncReceiveThreadDetail,
    asyncCreateComment,
    asyncGiveUpVoteDetail,
    asyncGiveDownVoteDetail,
    asyncGiveUpVoteComment,
    asyncGiveDownVoteComment
}
