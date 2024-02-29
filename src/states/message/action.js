const ActionType = {
  SET_MESSAGE: 'SET_MESSAGE',
  UNSET_MESSAGE: 'UNSET_MESSAGE'
}

const setMessageActionCreator = (message) => {
  return {
    type: ActionType.SET_MESSAGE,
    payload: {
      message
    }
  }
}

const unsetMessageActionCreator = () => {
  return {
    type: ActionType.UNSET_MESSAGE,
    payload: {
      message: null
    }
  }
}

export {
  ActionType,
  setMessageActionCreator,
  unsetMessageActionCreator
}
