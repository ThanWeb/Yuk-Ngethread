import { describe, it, expect } from 'vitest'
import leaderboardReducer from './reducer'

/**
 * test scenario for leaderboard reducer
 *
 * - leaderboardReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the array of leaderboard when given by RECEIVE_LEADERBOARDS action
 *
 */

describe('leaderboard reducer', () => {
    it('should return the initial state when given by unknown action', () => {
        const initialState = []
        const action = { type: 'UNKNOWN' }
        const nextState = leaderboardReducer(initialState, action)
        expect(nextState).toEqual(initialState)
    })

    it('should return array of leaderboard when given RECEIVE_LEADERBOARDS action', () => {
        const initialState = []
        const action = {
            type: 'RECEIVE_LEADERBOARDS',
            payload: {
                leaderboards: [
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
            }
        }
        const nextState = leaderboardReducer(initialState, action)
        expect(nextState).toEqual(action.payload.leaderboards)
    })
})
