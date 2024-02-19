import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import api from '../../utils/api'
import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from './action'

/**
 * skenario test
 *
 * - asyncReceiveLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 10
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 5
  }
]

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('asyncReceiveLeaderboards thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards
  })

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards
    delete api._getLeaderboards
  })

  it('should dispatch action correctly when data fetching success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse)
    const dispatch = vi.fn()
    await asyncReceiveLeaderboards()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardsResponse))
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse)
    const dispatch = vi.fn()
    window.alert = vi.fn()
    await asyncReceiveLeaderboards()(dispatch)
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})
