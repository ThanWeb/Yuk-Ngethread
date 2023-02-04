import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import UserAvatar from '../components/UserAvatar'
import { getFormattedDateString } from '../utils'

const CommentDetail = ({ comment }) => {
    return (
        <>
            <div className='comment-header'>
                <UserAvatar avatar={comment.owner.avatar} name={comment.owner.name} />
                <div className='comment-info'>
                    <h3 className='thread-owner'>{comment.owner.name}</h3>
                    <p className='thread-created'>{getFormattedDateString(comment.createdAt)}</p>
                </div>
            </div>
            <div className='comment-content'>{parse(comment.content)}</div>
        </>
    )
}

CommentDetail.propTypes = {
    comment: PropTypes.object
}

export default CommentDetail
