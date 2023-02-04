import { ActionType } from './action'

const threadsReducer = (threads = [], action = {}) => {
    switch (action.type) {
    case ActionType.RECEIVE_THREADS:
        return action.payload.threads
    case ActionType.CREATE_THREAD:
        return [action.payload.thread, ...threads]
    case ActionType.CREATE_COMMENT_THREAD:
        return threads.map((thread) => {
            if (thread.id === action.payload.id) {
                const newTotalComments = thread.totalComments + 1
                return {
                    ...thread,
                    totalComments: newTotalComments
                }
            }
            return thread
        })
    default:
        return threads
    }
}

export default threadsReducer
