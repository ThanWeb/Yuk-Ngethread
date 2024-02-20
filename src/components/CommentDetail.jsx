import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import UserAvatar from '../components/UserAvatar'
import { getFormattedDateString } from '../utils'

const CommentDetail = ({ comment }) => {
  return (
    <>
      <div>
        <UserAvatar
          avatar={comment.owner.avatar}
          name={comment.owner.name}
        />
        <div>
          <h3>{comment.owner.name}</h3>
          <p>{getFormattedDateString(comment.createdAt)}</p>
        </div>
      </div>
      <div>{parse(comment.content)}</div>
    </>
  )
}

CommentDetail.propTypes = {
  comment: PropTypes.object
}

export default CommentDetail
