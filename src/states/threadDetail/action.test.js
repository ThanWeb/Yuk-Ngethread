import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import api from '../../utils/api'
import { receiveThreadDetailActionCreator, createCommentActionCreator, giveUpVoteDetailActionCreator, giveDownVoteDetailActionCreator, giveUpVoteCommentActionCreator, giveDownVoteCommentActionCreator, asyncReceiveThreadDetail, asyncCreateComment, asyncGiveUpVoteDetail, asyncGiveDownVoteDetail, asyncGiveUpVoteComment, asyncGiveDownVoteComment } from './action'

/**
 * skenario test
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncCreateComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncGiveUpVoteDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncGiveDownVoteDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncGiveUpVoteDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncGiveDownVoteDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeThreadId = 'thread-1'

const fakeCommentId = 'comment-1'

const fakeReceiveThreadDetailResponse = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg'
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
        {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg'
            },
            upVotesBy: [],
            downVotesBy: []
        }
    ]
}

const fakeCreateCommentParam = {
    content: 'Ini adalah komentar kedua',
    id: fakeThreadId
}

const fakeCreateCommentResponse = {
    id: 'comment-2',
    content: 'Ini adalah komentar kedua',
    createdAt: '2021-07-21T07:00:00.000Z',
    upVotesBy: [],
    downVotesBy: [],
    owner: {
        id: 'users-2',
        name: 'John Two',
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

const fakeGiveUpVoteCommentResponse = {
    id: 'vote-1',
    userId: 'users-1',
    commentId: 'comment-1',
    voteType: 1
}

const fakeGiveDownVoteCommentResponse = {
    id: 'vote-1',
    userId: 'users-1',
    commentId: 'comment-1',
    voteType: -1
}

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('asyncReceiveThreadDetail thunk', () => {
    beforeEach(() => {
        api._getDetailThread = api.getDetailThread
    })

    afterEach(() => {
        api.getDetailThread = api._getDetailThread
        delete api._getDetailThread
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.getDetailThread = () => Promise.resolve(fakeReceiveThreadDetailResponse)
        const dispatch = vi.fn()
        await asyncReceiveThreadDetail(fakeThreadId)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeReceiveThreadDetailResponse))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.getDetailThread = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncReceiveThreadDetail(fakeThreadId)(dispatch)
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

describe('asyncGiveUpVoteDetail thunk', () => {
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
        await asyncGiveUpVoteDetail(fakeThreadId)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(giveUpVoteDetailActionCreator(fakeGiveUpVoteResponse))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.giveUpVoteThread = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncGiveUpVoteDetail(fakeThreadId)(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})

describe('asyncGiveDownVoteDetail thunk', () => {
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
        await asyncGiveDownVoteDetail(fakeThreadId)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(giveDownVoteDetailActionCreator(fakeGiveDownVoteResponse))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.giveDownVoteThread = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncGiveDownVoteDetail(fakeThreadId)(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})

describe('asyncGiveUpVoteComment thunk', () => {
    beforeEach(() => {
        api._giveUpVoteComment = api.giveUpVoteComment
    })

    afterEach(() => {
        api.giveUpVoteComment = api._giveUpVoteComment
        delete api._giveUpVoteComment
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.giveUpVoteComment = () => Promise.resolve(fakeGiveUpVoteCommentResponse)
        const dispatch = vi.fn()
        await asyncGiveUpVoteComment({ threadId: fakeThreadId, commentId: fakeCommentId })(dispatch)
        expect(dispatch).toHaveBeenCalledWith(giveUpVoteCommentActionCreator({ commentId: fakeCommentId, vote: fakeGiveUpVoteCommentResponse }))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.giveUpVoteComment = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncGiveUpVoteComment({ threadId: fakeThreadId, commentId: fakeCommentId })(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})

describe('asyncGiveDownVoteComment thunk', () => {
    beforeEach(() => {
        api._giveDownVoteComment = api.giveDownVoteComment
    })

    afterEach(() => {
        api.giveDownVoteComment = api._giveDownVoteComment
        delete api._giveDownVoteComment
    })

    it('should dispatch action correctly when data fetching success', async () => {
        api.giveDownVoteComment = () => Promise.resolve(fakeGiveDownVoteCommentResponse)
        const dispatch = vi.fn()
        await asyncGiveDownVoteComment({ threadId: fakeThreadId, commentId: fakeCommentId })(dispatch)
        expect(dispatch).toHaveBeenCalledWith(giveDownVoteCommentActionCreator({ commentId: fakeCommentId, vote: fakeGiveDownVoteCommentResponse }))
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.giveDownVoteComment = () => Promise.reject(fakeErrorResponse)
        const dispatch = vi.fn()
        window.alert = vi.fn()
        await asyncGiveDownVoteComment({ threadId: fakeThreadId, commentId: fakeCommentId })(dispatch)
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})
