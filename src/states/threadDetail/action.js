import api from '../../utils/api'
import { setMessageActionCreator } from '../message/action'

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  GIVE_UP_VOTE_THREAD_DETAIL: 'GIVE_UP_VOTE_THREAD_DETAIL',
  GIVE_DOWN_VOTE_THREAD_DETAIL: 'GIVE_DOWN_VOTE_THREAD_DETAIL',
  CREATE_COMMENT_THREAD_DETAIL: 'CREATE_COMMENT_THREAD_DETAIL',
  GIVE_UP_VOTE_COMMENT_THREAD_DETAIL: 'GIVE_UP_VOTE_COMMENT_THREAD_DETAIL',
  GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL: 'GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL'
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
    dispatch(clearThreadDetailActionCreator())
    try {
      const response = await api.getDetailThread(threadId)
      return response
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
        return status
      } else if (status === 'fail') {
        dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncGiveUpVoteDetail = (id) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.giveUpVoteThread(id)

      if (status !== 'fail') {
        dispatch(giveUpVoteDetailActionCreator(data.vote))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncGiveDownVoteDetail = (id) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.giveDownVoteThread(id)

      if (status !== 'fail') {
        dispatch(giveDownVoteDetailActionCreator(data.vote))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncGiveUpVoteComment = ({ threadId, commentId }) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.giveUpVoteComment({ threadId, commentId })

      if (status !== 'fail') {
        dispatch(giveUpVoteCommentActionCreator({ commentId, vote: data.vote }))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
  }
}

const asyncGiveDownVoteComment = ({ threadId, commentId }) => {
  return async (dispatch) => {
    try {
      const { status = 'fail', message = '', data = null } = await api.giveDownVoteComment({ threadId, commentId })

      if (status !== 'fail') {
        dispatch(giveDownVoteCommentActionCreator({ commentId, vote: data.vote }))
      }

      dispatch(setMessageActionCreator({ show: true, error: status === 'fail', text: message }))
    } catch (error) {
      return api.handleError(error)
    }
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
