import { ActionType } from './action'

const messageReducer = (message = { show: false, error: false, text: '' }, action) => {
  switch (action.type) {
  case ActionType.SET_MESSAGE:
    return action.payload.message
  case ActionType.UNSET_MESSAGE:
    return { show: false, error: false, text: '' }
  default:
    return message
  }
}

export default messageReducer
