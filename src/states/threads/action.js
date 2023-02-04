import api from '../../utils/api'

const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    CREATE_THREAD: 'CREATE_THREAD',
    GIVE_UP_VOTE_THREAD: 'GIVE_UP_VOTE_THREAD',
    GIVE_DOWN_VOTE_THREAD: 'GIVE_DOWN_VOTE_THREAD',
    GIVE_NEUTRAL_VOTE_THREAD: 'GIVE_NEUTRAL_VOTE_THREAD',
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

const asyncCreateThread = ({ title, body, category }) => {
    return async (dispatch) => {
        try {
            const thread = await api.createThread({ title, body, category })
            dispatch(createThreadActionCreator(thread))
        } catch (error) {
            alert(error.message)
        }
    }
}

const asyncCreateComment = ({ content, id }) => {
    return async (dispatch) => {
        try {
            const comment = await api.createCommentThread({ content, id })
            dispatch(createCommentActionCreator(comment, id))
        } catch (error) {
            alert(error.message)
        }
    }
}

export {
    ActionType,
    receiveThreadsActionCreator,
    createThreadActionCreator,
    asyncCreateThread,
    asyncCreateComment
}
