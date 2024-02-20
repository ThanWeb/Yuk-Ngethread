import { describe, it, expect } from 'vitest'
import threadsReducer from './reducer'

/**
 * test scenario for threads reducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the array of threads when given by RECEIVE_THREADS action
 *  - should return new array of threads when given CREATE_THREAD action
 *  - should return new total comments of one thread when given CREATE_COMMENT_THREAD action
 *  - should return new up vote of one thread when given GIVE_UP_VOTE_THREAD action
 *  - should return new down vote of one thread when given GIVE_DOWN_VOTE_THREAD action
 *
 */

describe('threads reducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = []
    const action = { type: 'UNKNOWN' }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })

  it('should return array of threads when given RECEIVE_THREADS action', () => {
    const initialState = []

    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          }
        ]
      }
    }

    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(action.payload.threads)
  })

  it('should return new array of threads when given CREATE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const action = {
      type: 'CREATE_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0
        }
      }
    }

    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual([action.payload.thread, ...initialState])
  })

  it('should return new total comments of one thread when given CREATE_COMMENT_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const expectedState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 1
      }
    ]

    const action = {
      type: 'CREATE_COMMENT_THREAD',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com'
          }
        },
        id: 'thread-1'
      }
    }

    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(expectedState)
  })

  it('should return new up vote of one thread when given GIVE_UP_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const expectedState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const action = {
      type: 'GIVE_UP_VOTE_THREAD',
      payload: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 1
        }
      }
    }

    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(expectedState)
  })

  it('should return new down vote of one thread when given GIVE_DOWN_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const expectedState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-1'],
        totalComments: 0
      }
    ]

    const action = {
      type: 'GIVE_DOWN_VOTE_THREAD',
      payload: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 1
        }
      }
    }

    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(expectedState)
  })
})
