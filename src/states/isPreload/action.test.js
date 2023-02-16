import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import api from '../../utils/api'
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action'
import { setAuthUserActionCreator } from '../authUser/action'

/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action with null data when data fetching failed
 */

const fakeGetOwnProfileResponse = {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg'
}

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('asyncPreloadProcess thunk', () => {
    beforeEach(() => {
        api._getOwnProfile = api.getOwnProfile
    })

    afterEach(() => {
        api.getOwnProfile = api._getOwnProfile
        delete api._getOwnProfile
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.getOwnProfile = () => Promise.resolve(fakeGetOwnProfileResponse)
        const dispatch = vi.fn()
        await asyncPreloadProcess()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeGetOwnProfileResponse))
        expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false))
    })

    it('should dispatch action with null data when data fetching failed', async () => {
        api.getOwnProfile = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        await asyncPreloadProcess()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null))
        expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false))
    })
})
