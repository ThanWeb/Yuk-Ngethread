import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import api from '../../utils/api'
import { setAuthUserActionCreator, unsetAuthUserActionCreator, asyncSetAuthUser, asyncUnsetAuthUser } from './action'

/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action correctly
 */

const fakeGetOwnProfileResponse = {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg'
}

const fakeLoginParam = { email: 'test-email', password: 'test-password' }
const fakeErrorResponse = new Error('Ups, something went wrong')
const fakeLoginResponse = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw'

describe('asyncSetAuthUser thunk', () => {
    beforeEach(() => {
        api._getOwnProfile = api.getOwnProfile
        api._login = api.login
    })

    afterEach(() => {
        api.getOwnProfile = api._getOwnProfile
        api.login = api._login
        delete api._getOwnProfile
        delete api._login
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.login = () => Promise.resolve(fakeLoginResponse)
        api.getOwnProfile = () => Promise.resolve(fakeGetOwnProfileResponse)
        const dispatch = vi.fn()
        await asyncSetAuthUser(fakeLoginParam)(dispatch)
        expect(api.getAccessToken()).toEqual(fakeLoginResponse)
        expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeGetOwnProfileResponse))
    })

    it('should dispatch action and call alert correctly when login failed', async () => {
        api.login = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncSetAuthUser(fakeLoginParam)(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })

    it('should dispatch action and call alert correctly when fetch data failed', async () => {
        api.getOwnProfile = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncSetAuthUser(fakeLoginParam)(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})

describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch action correctly', () => {
        const dispatch = vi.fn()
        asyncUnsetAuthUser()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator())
        expect(api.getAccessToken()).toEqual('')
    })
})
