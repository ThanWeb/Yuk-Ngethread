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
    try {
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
    } catch (error) {
      return handleError(error)
    }
  }

  const login = async ({ email, password }) => {
    try {
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
    } catch (error) {
      return handleError(error)
    }
  }

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`)
      const responseJson = await response.json()
      const { status, message } = responseJson

      if (status !== 'success') {
        console.error(message)
      }

      const { data: { users } } = responseJson
      return users
    } catch (error) {
      return handleError(error)
    }
  }

  const getOwnProfile = async () => {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/users/me`)
      const responseJson = await response.json()
      const { data: { user } } = responseJson
      return user
    } catch (error) {
      return handleError(error)
    }
  }

  const createThread = async ({ title, body, category = '' }) => {
    try {
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
      return responseJson
    } catch (error) {
      return handleError(error)
    }
  }

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${BASE_URL}/threads`)
      const responseJson = await response.json()
      const { status, message } = responseJson

      if (status !== 'success') {
        console.error(message)
      }

      const { data: { threads } } = responseJson
      return threads
    } catch (error) {
      return handleError(error)
    }
  }

  const getDetailThread = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/threads/${id}`)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      return handleError(error)
    }
  }

  const createCommentThread = async ({ content, id }) => {
    try {
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
      return responseJson
    } catch (error) {
      return handleError(error)
    }
  }

  const giveUpVoteThread = async (id) => {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
        method: 'POST'
      })

      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      return handleError(error)
    }
  }

  const giveDownVoteThread = async (id) => {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
        method: 'POST'
      })

      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      return handleError(error)
    }
  }

  const giveUpVoteComment = async ({ threadId, commentId }) => {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
        method: 'POST'
      })

      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      return handleError(error)
    }
  }

  const giveDownVoteComment = async ({ threadId, commentId }) => {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
        method: 'POST'
      })

      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      return handleError(error)
    }
  }

  const getLeaderboards = async () => {
    try {
      const response = await fetch(`${BASE_URL}/leaderboards`)
      const responseJson = await response.json()
      const { status, message } = responseJson

      if (status !== 'success') {
        console.error(message)
      }

      const { data: { leaderboards } } = responseJson
      return leaderboards
    } catch (error) {
      return handleError(error)
    }
  }

  const handleError = (error) => {
    console.error(error.message)
    return { status: 'fail', message: 'error occured' }
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
