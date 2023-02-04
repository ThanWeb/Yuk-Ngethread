import PropTypes from 'prop-types'
import { findWhoGiveVote } from '../utils'

const VoteInfo = ({ users, detail }) => {
    return (
        <>
            {
                detail.upVotesBy.length + detail.downVotesBy.length > 0
                    ? <p>
                        <span>{findWhoGiveVote(users, detail.upVotesBy[detail.upVotesBy.length - 1] || detail.downVotesBy[detail.downVotesBy.length - 1])}</span>
                        {
                            detail.upVotesBy.length + detail.downVotesBy.length > 1 &&
                            <span> and {detail.upVotesBy.length + detail.downVotesBy.length - 1} more</span>
                        }
                        <span> give a vote</span>
                    </p>
                    : <p>No one voted</p>
            }
        </>
    )
}

VoteInfo.propTypes = {
    users: PropTypes.array,
    detail: PropTypes.object
}

export default VoteInfo
