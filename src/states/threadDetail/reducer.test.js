import { describe, it, expect } from 'vitest'
import threadDetailReducer from './reducer'

/**
 * test scenario for threadDetail reducer
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the null value when given by CLEAR_THREAD_DETAIL action
 *  - should return the threadDetail value of object when given by RECEIVE_THREAD_DETAIL action
 *  - should return the new array of comments when given by CREATE_COMMENT_THREAD_DETAIL action
 *  - should return the new up votes array of thread by when given by GIVE_UP_VOTE_THREAD_DETAIL action
 *  - should return the new down votes array of thread when given by GIVE_DOWN_VOTE_THREAD_DETAIL action
 *  - should return the new up votes array of certain comment when given by GIVE_UP_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return the new down votes array of certain comment when given by GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL action
 */

describe('threadDetail reducer', () => {
    it('should return the initial state when given by unknown action', () => {
        const initialState = null
        const action = { type: 'UNKNOWN' }
        const nextState = threadDetailReducer(initialState, action)
        expect(nextState).toEqual(initialState)
    })

    it('should return the null value when given by CLEAR_THREAD_DETAIL action', () => {
        const initialState = null
        const action = { type: 'CLEAR_THREAD_DETAIL' }
        const nextState = threadDetailReducer(initialState, action)
        expect(nextState).toEqual(null)
    })

    it('should return the threadDetail value of object when given by RECEIVE_THREAD_DETAIL action', () => {
        const initialState = null
        const action = {
            type: 'RECEIVE_THREAD_DETAIL',
            payload: {
                threadDetail: {
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
            }
        }
        const nextState = threadDetailReducer(initialState, action)
        expect(nextState).toEqual(action.payload.threadDetail)
    })

    it('should return the new array of comments when given by CREATE_COMMENT_THREAD_DETAIL action', () => {
        const initialState = {
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
        const action = {
            type: 'CREATE_COMMENT_THREAD_DETAIL',
            payload: {
                comment: {
                    id: 'comment-2',
                    content: 'Ini adalah komentar kedua',
                    createdAt: '2021-06-21T07:00:00.000Z',
                    upVotesBy: [],
                    downVotesBy: [],
                    owner: {
                        id: 'users-2',
                        name: 'John Doe 2',
                        email: 'john@example.com'
                    }
                }
            }
        }
        const nextState = threadDetailReducer(initialState, action)
        expect(nextState).toEqual({ ...initialState, comments: [action.payload.comment, ...initialState.comments] })
    })

    it('should return the new up votes array of thread by when given by GIVE_UP_VOTE_THREAD_DETAIL action', () => {
        const initialState = {
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
        const action = {
            type: 'GIVE_UP_VOTE_THREAD_DETAIL',
            payload: {
                vote: {
                    id: 'vote-1',
                    userId: 'users-1',
                    threadId: 'thread-1',
                    voteType: 1
                }
            }
        }
        const nextState = threadDetailReducer(initialState, action)
        expect(nextState).toEqual({ ...initialState, upVotesBy: [action.payload.vote.userId] })
    })

    it('should return the new down votes array of thread when given by GIVE_DOWN_VOTE_THREAD_DETAIL action', () => {
        const initialState = {
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
        const action = {
            type: 'GIVE_DOWN_VOTE_THREAD_DETAIL',
            payload: {
                vote: {
                    id: 'vote-1',
                    userId: 'users-1',
                    threadId: 'thread-1',
                    voteType: 1
                }
            }
        }
        const nextState = threadDetailReducer(initialState, action)
        expect(nextState).toEqual({ ...initialState, downVotesBy: [action.payload.vote.userId] })
    })

    it('should return the new up votes array of certain comment when given by GIVE_UP_VOTE_COMMENT_THREAD_DETAIL action', () => {
        const initialState = {
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
        const action = {
            type: 'GIVE_UP_VOTE_COMMENT_THREAD_DETAIL',
            payload: {
                commentId: 'comment-1',
                vote: {
                    id: 'vote-1',
                    userId: 'users-1',
                    commentId: 'comment-1',
                    voteType: 1
                }
            }
        }
        const nextState = threadDetailReducer(initialState, action)
        expect(nextState).toEqual({ ...initialState, comments: [{ ...initialState.comments[0], upVotesBy: [action.payload.vote.userId] }] })
    })

    it('should return the new down votes array of certain comment when given by GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL action', () => {
        const initialState = {
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
        const action = {
            type: 'GIVE_DOWN_VOTE_COMMENT_THREAD_DETAIL',
            payload: {
                commentId: 'comment-1',
                vote: {
                    id: 'vote-1',
                    userId: 'users-1',
                    commentId: 'comment-1',
                    voteType: 1
                }
            }
        }
        const nextState = threadDetailReducer(initialState, action)
        expect(nextState).toEqual({ ...initialState, comments: [{ ...initialState.comments[0], downVotesBy: [action.payload.vote.userId] }] })
    })
})
