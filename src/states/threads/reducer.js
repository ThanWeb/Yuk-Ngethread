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
  case ActionType.GIVE_UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.vote.threadId) {
        const newDownVotes = []
        const newUpVotes = [...thread.upVotesBy, action.payload.vote.userId]
        const index = thread.downVotesBy.indexOf(action.payload.vote.userId)

        if (index > -1) {
          thread.downVotesBy.forEach(voteBy => {
            if (voteBy !== action.payload.vote.userId) {
              newDownVotes.push(voteBy)
            }
          })
        }

        return {
          ...thread,
          upVotesBy: newUpVotes,
          downVotesBy: newDownVotes
        }
      }

      return thread
    })
  case ActionType.GIVE_DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.vote.threadId) {
        const newUpVotes = []
        const newDownVotes = [...thread.downVotesBy, action.payload.vote.userId]
        const index = thread.upVotesBy.indexOf(action.payload.vote.userId)

        if (index > -1) {
          thread.upVotesBy.forEach(voteBy => {
            if (voteBy !== action.payload.vote.userId) {
              newUpVotes.push(voteBy)
            }
          })
        }

        return {
          ...thread,
          upVotesBy: newUpVotes,
          downVotesBy: newDownVotes
        }
      }

      return thread
    })
  default:
    return threads
  }
}

export default threadsReducer
