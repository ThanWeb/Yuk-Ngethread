import { describe, it, expect } from 'vitest'
import authUserReducer from './reducer'

describe('authUser reducer', () => {
    it('should return the initial state when given by unknown action', () => {
        const initialState = null
        const action = { type: 'UNKNOWN' }
        const nextState = authUserReducer(initialState, action)
        expect(nextState).toEqual(initialState)
    })

    it('should return null when UNSET_AUTH_USER action', () => {
        const initialState = null
        const action = { type: 'UNSET_AUTH_USER' }
        const nextState = authUserReducer(initialState, action)
        expect(nextState).toEqual(null)
    })

    it('should return user data when given SET_AUTH_USER action', () => {
        const expectedResult = {
            status: 'success',
            message: 'ok',
            data: {
                user: {
                    id: 'john_doe',
                    name: 'John Doe',
                    email: 'john@example.com',
                    avatar: 'https://generated-image-url.jpg'
                }
            }
        }
        const initialState = null
        const action = {
            type: 'SET_AUTH_USER',
            payload: {
                authUser: expectedResult
            }
        }
        const nextState = authUserReducer(initialState, action)
        expect(nextState).toEqual(expectedResult)
    })
})
