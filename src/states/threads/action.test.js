import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import api from '../../utils/api'
import { createThreadActionCreator, createCommentActionCreator, giveUpVoteActionCreator, giveDownVoteActionCreator, asyncCreateThread, asyncCreateComment, asyncGiveUpVote, asyncGiveDownVote } from './action'

/**
 * skenario test
 *
 * - asyncCreateThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncCreateComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncGiveUpVote thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncGiveDownVote thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeCreateThreadParam = {
    title: 'test-thread',
    category: 'test',
    body: 'test only, please ignore'
}

const fakeCreateThreadResponse = {
    id: 'thread-1',
    title: 'test-thread',
    body: 'test only, please ignore',
    category: 'test',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
}

const fakeCreateCommentParam = {
    content: 'Ini adalah komentar pertama'
}

const fakeCreateCommentResponse = {
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
}

const fakeGiveUpVoteResponse = {
    id: 'vote-1',
    userId: 'users-1',
    threadId: 'thread-1',
    voteType: 1
}

const fakeGiveDownVoteResponse = {
    id: 'vote-1',
    userId: 'users-1',
    threadId: 'thread-1',
    voteType: -1
}

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('asyncCreateThread thunk', () => {
    beforeEach(() => {
        api._createThread = api.createThread
    })

    afterEach(() => {
        api.createThread = api._createThread
        delete api._createThread
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.createThread = () => Promise.resolve(fakeCreateThreadResponse)
        const dispatch = vi.fn()
        await asyncCreateThread(fakeCreateThreadParam)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(createThreadActionCreator(fakeCreateThreadResponse))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.createThread = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncCreateThread(fakeCreateThreadParam)(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})

describe('asyncCreateComment thunk', () => {
    beforeEach(() => {
        api._createCommentThread = api.createCommentThread
    })

    afterEach(() => {
        api.createCommentThread = api._createCommentThread
        delete api._createCommentThread
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.createCommentThread = () => Promise.resolve(fakeCreateCommentResponse)
        const dispatch = vi.fn()
        await asyncCreateComment(fakeCreateCommentParam)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(createCommentActionCreator(fakeCreateCommentResponse))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.createCommentThread = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncCreateComment(fakeCreateCommentParam)(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})

describe('asyncGiveUpVote thunk', () => {
    beforeEach(() => {
        api._giveUpVoteThread = api.giveUpVoteThread
    })

    afterEach(() => {
        api.giveUpVoteThread = api._giveUpVoteThread
        delete api._giveUpVoteThread
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.giveUpVoteThread = () => Promise.resolve(fakeGiveUpVoteResponse)
        const dispatch = vi.fn()
        await asyncGiveUpVote()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(giveUpVoteActionCreator(fakeGiveUpVoteResponse))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.giveUpVoteThread = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncGiveUpVote()(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})

describe('asyncGiveDownVote thunk', () => {
    beforeEach(() => {
        api._giveDownVoteThread = api.giveDownVoteThread
    })

    afterEach(() => {
        api.giveDownVoteThread = api._giveDownVoteThread
        delete api._giveDownVoteThread
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.giveDownVoteThread = () => Promise.resolve(fakeGiveDownVoteResponse)
        const dispatch = vi.fn()
        await asyncGiveDownVote()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(giveDownVoteActionCreator(fakeGiveDownVoteResponse))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.giveDownVoteThread = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncGiveDownVote()(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})
