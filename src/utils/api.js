const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1'

  const _fetchWithAuth = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }

  const putAccessToken = (token) => {
    localStorage.setItem('accessToken', token)
  }

  const getAccessToken = () => {
    return localStorage.getItem('accessToken')
  }

  const register = async ({ name, email, password }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const responseJson = await response.json()
    return responseJson
  }

  const login = async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const responseJson = await response.json()
    return responseJson
  }

  const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`)
    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { users } } = responseJson
    return users
  }

  const getOwnProfile = async () => {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`)
    const responseJson = await response.json()
    return responseJson
  }

  const createThread = async ({ title, body, category = '' }) => {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        category
      })
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { thread } } = responseJson
    return thread
  }

  const getAllThreads = async () => {
    const response = await fetch(`${BASE_URL}/threads`)
    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { threads } } = responseJson
    return threads
  }

  const getDetailThread = async (id) => {
    const response = await fetch(`${BASE_URL}/threads/${id}`)
    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { detailThread } } = responseJson
    return detailThread
  }

  const createCommentThread = async ({ content, id }) => {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content
      })
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { comment } } = responseJson
    return comment
  }

  const giveUpVoteThread = async (id) => {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { vote } } = responseJson
    return vote
  }

  const giveDownVoteThread = async (id) => {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { vote } } = responseJson
    return vote
  }

  const giveUpVoteComment = async ({ threadId, commentId }) => {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { vote } } = responseJson
    return vote
  }

  const giveDownVoteComment = async ({ threadId, commentId }) => {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { vote } } = responseJson
    return vote
  }

  const getLeaderboards = async () => {
    const response = await fetch(`${BASE_URL}/leaderboards`)
    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      console.log(message)
    }

    const { data: { leaderboards } } = responseJson
    return leaderboards
  }

  const handleError = (error) => {
    console.error(error.message)
    return { status: 'fail', message: 'server error' }
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getDetailThread,
    createCommentThread,
    giveUpVoteThread,
    giveDownVoteThread,
    giveUpVoteComment,
    giveDownVoteComment,
    getLeaderboards,
    handleError
  }
})()

export default api
