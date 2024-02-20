import { ActionType } from './action'

const messageReducer = (message = null, action) => {
  switch (action.type) {
  case ActionType.SET_MESSAGE:
    return action.payload.message
  case ActionType.UNSET_MESSAGE:
    return null
  default:
    return message
  }
}

export default messageReducer
