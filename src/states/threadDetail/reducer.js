import { ActionType } from './action'

const updateNewUpVotes = (votes, id, isUpVote) => {
    if (isUpVote) {
        const newUpVotes = [...votes, id]
        return newUpVotes
    } else {
        const newDownVotes = []
        const index = votes.indexOf(id)
        if (index > -1) {
            votes.forEach(voteBy => {
                if (voteBy !== id) {
                    newDownVotes.push(voteBy)
                }
            })
        }
        return newDownVotes
    }
}

const updateNewDownVotes = (votes, id, isDownVote) => {
    if (isDownVote) {
        const newDownVotes = [...votes, id]
        return newDownVotes
    } else {
        const newUpVotes = []
        const index = votes.indexOf(id)
        if (index > -1) {
            votes.forEach(voteBy => {
                if (voteBy !== id) {
                    newUpVotes.push(voteBy)
                }
            })
        }
        return newUpVotes
    }
}

const threadDetailReducer = (threadDetail = null, action = {}) => {
    switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
        return action.payload.threadDetail
    case ActionType.CLEAR_THREAD_DETAIL:
        return null
    case ActionType.CREATE_COMMENT_THREAD_DETAIL:
        return { ...threadDetail, comments: [action.payload.comment, ...threadDetail.comments] }
    case ActionType.GIVE_UP_VOTE_THREAD_DETAIL:
        return {
            ...threadDetail,
            upVotesBy: updateNewUpVotes(threadDetail.upVotesBy, action.payload.vote.userId, true),
            downVotesBy: updateNewUpVotes(threadDetail.downVotesBy, action.payload.vote.userId, false)
        }
    case ActionType.GIVE_DOWN_VOTE_THREAD_DETAIL:
        return {
            ...threadDetail,
            upVotesBy: updateNewDownVotes(threadDetail.upVotesBy, action.payload.vote.userId, false),
            downVotesBy: updateNewDownVotes(threadDetail.downVotesBy, action.payload.vote.userId, true)
        }
    default:
        return threadDetail
    }
}

export default threadDetailReducer
