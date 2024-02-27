import api from '../../utils/api'
import { setMessageActionCreator } from '../message/action'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  GIVE_UP_VOTE_THREAD: 'GIVE_UP_VOTE_THREAD',
  GIVE_DOWN_VOTE_THREAD: 'GIVE_DOWN_VOTE_THREAD',
  CREATE_COMMENT_THREAD: 'CREATE_COMMENT_THREAD',
  UNDO_GIVE_VOTE_THREAD: 'UNDO_GIVE_VOTE_THREAD'
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

const giveDownVoteActionCreator = (vote) => {
  return {
    type: ActionType.GIVE_DOWN_VOTE_THREAD,
    payload: {
      vote
    }
  }
}

const undoGiveVoteActionCreator = (isVoteUp, threadId, userId) => {
  return {
    type: ActionType.UNDO_GIVE_VOTE_THREAD,
    payload: {
      isVoteUp,
      threadId,
      userId
    }
  }
}

const asyncCreateThread = ({ title, body, category }) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.createThread({ title, body, category })

      if (status !== 'fail') {
        dispatch(createThreadActionCreator(data.thread))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncCreateComment = ({ content, id }) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.createCommentThread({ content, id })

      if (status !== 'fail') {
        dispatch(createCommentActionCreator(data.comment, id))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncGiveUpVote = (threadId, userId) => {
  return async (dispatch) => {
    try {
      dispatch(giveUpVoteActionCreator({ threadId, userId }))
      const { status = 'fail', message = '' } = await api.giveUpVoteThread(threadId)

      if (status === 'fail') {
        dispatch(setMessageActionCreator({ show: true, error: true, text: message }))
        dispatch(undoGiveVoteActionCreator(true, threadId, userId))
      }
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncGiveDownVote = (threadId, userId) => {
  return async (dispatch) => {
    try {
      dispatch(giveDownVoteActionCreator({ threadId, userId }))
      const { status = 'fail', message = '' } = await api.giveDownVoteThread(threadId)

      if (status === 'fail') {
        dispatch(setMessageActionCreator({ show: true, error: true, text: message }))
        dispatch(undoGiveVoteActionCreator(false, threadId, userId))
      }
    } catch (error) {
      return api.handleError(error)
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  createCommentActionCreator,
  giveUpVoteActionCreator,
  giveDownVoteActionCreator,
  asyncCreateThread,
  asyncCreateComment,
  asyncGiveUpVote,
  asyncGiveDownVote
}
