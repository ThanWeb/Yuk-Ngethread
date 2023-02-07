import api from '../../utils/api'
import { showLoading, hideLoading } from '../../utils'

const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    CREATE_THREAD: 'CREATE_THREAD',
    GIVE_UP_VOTE_THREAD: 'GIVE_UP_VOTE_THREAD',
    GIVE_DOWN_VOTE_THREAD: 'GIVE_DOWN_VOTE_THREAD',
    // GIVE_NEUTRAL_VOTE_THREAD: 'GIVE_NEUTRAL_VOTE_THREAD',
    CREATE_COMMENT_THREAD: 'CREATE_COMMENT_THREAD'
}

const receiveThreadsActionCreator = (threads) => {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: {
            threads
        }
    }
}

const createThreadActionCreator = (thread) => {
    return {
        type: ActionType.CREATE_THREAD,
        payload: {
            thread
        }
    }
}

const createCommentActionCreator = (comment, id) => {
    return {
        type: ActionType.CREATE_COMMENT_THREAD,
        payload: {
            comment,
            id
        }
    }
}

const giveUpVoteActionCreator = (vote) => {
    return {
        type: ActionType.GIVE_UP_VOTE_THREAD,
        payload: {
            vote
        }
    }
}

const asyncCreateThread = ({ title, body, category }) => {
    return async (dispatch) => {
        showLoading()
        try {
            const thread = await api.createThread({ title, body, category })
            dispatch(createThreadActionCreator(thread))
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
            dispatch(createCommentActionCreator(comment, id))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

const asyncGiveUpVote = (id) => {
    return async (dispatch) => {
        showLoading()
        try {
            const vote = await api.giveUpVoteThread(id)
            dispatch(giveUpVoteActionCreator(vote))
        } catch (error) {
            alert(error.message)
        }
        hideLoading()
    }
}

export {
    ActionType,
    receiveThreadsActionCreator,
    createThreadActionCreator,
    createCommentActionCreator,
    giveUpVoteActionCreator,
    asyncCreateThread,
    asyncCreateComment,
    asyncGiveUpVote
}
