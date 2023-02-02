// import api from '../../utils/api'

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

export {
    ActionType,
    receiveThreadsActionCreator
}
