const ActionType = {
  SET_LOADING_TRUE: 'SET_LOADING_TRUE',
  SET_LOADING_FALSE: 'SET_LOADING_FALSE'
}

const setLoadingTrueActionCreator = (isLoading = false) => {
  return {
    type: ActionType.SET_LOADING_TRUE,
    payload: {
      isLoading: true
    }
  }
}

const setLoadingFalseActionCreator = () => {
  return {
    type: ActionType.SET_LOADING_FALSE,
    payload: {
      isLoading: false
    }
  }
}

export {
  ActionType,
  setLoadingTrueActionCreator,
  setLoadingFalseActionCreator
}
