import api from '../../utils/api'
import { setMessageActionCreator } from '../message/action'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  GIVE_UP_VOTE_THREAD: 'GIVE_UP_VOTE_THREAD',
  GIVE_DOWN_VOTE_THREAD: 'GIVE_DOWN_VOTE_THREAD',
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

const giveDownVoteActionCreator = (vote) => {
  return {
    type: ActionType.GIVE_DOWN_VOTE_THREAD,
    payload: {
      vote
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

const asyncGiveUpVote = (id) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.giveUpVoteThread(id)

      if (status !== 'fail') {
        dispatch(giveUpVoteActionCreator(data.vote))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncGiveDownVote = (id) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.giveDownVoteThread(id)

      if (status !== 'fail') {
        dispatch(giveUpVoteActionCreator(data.vote))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
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
