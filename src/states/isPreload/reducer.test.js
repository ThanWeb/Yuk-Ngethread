import { describe, it, expect } from 'vitest'
import isPreloadReducer from './reducer'

describe('isPreload reducer', () => {
    it('should return the initial state when given by unknown action', () => {
        const initialState = true
        const action = { type: 'UNKNOWN' }
        const nextState = isPreloadReducer(initialState, action)
        expect(nextState).toEqual(initialState)
    })

    it('should return false when given SET_IS_PRELOAD action', () => {
        const initialState = true
        const action = {
            type: 'SET_IS_PRELOAD',
            payload: {
                isPreload: false
            }
        }
        const nextState = isPreloadReducer(initialState, action)
        expect(nextState).toEqual(action.payload.isPreload)
    })
})
