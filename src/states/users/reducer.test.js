import { describe, it, expect } from 'vitest'
import usersReducer from './reducer'

/**
 * test scenario for users reducer
 *
 * - usersReducer function
 *  - should return the initial state when given by unknown action
 *  - should return array of users when given RECEIVE_USERS action
 *
 */

describe('users reducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = []
    const action = { type: 'UNKNOWN' }
    const nextState = usersReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })

  it('should return array of users when given RECEIVE_USERS action', () => {
    const initialState = []

    const action = {
      type: 'RECEIVE_USERS',
      payload: {
        users: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg'
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg'
          },
          {
            id: 'fulan',
            name: 'Si Fulan',
            email: 'fulan@example.com',
            avatar: 'https://generated-image-url.jpg'
          }
        ]
      }
    }

    const nextState = usersReducer(initialState, action)
    expect(nextState).toEqual(action.payload.users)
  })
})
