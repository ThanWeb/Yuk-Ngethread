import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveThreadDetail, asyncCreateComment, asyncGiveUpVoteDetail, asyncGiveDownVoteDetail, asyncGiveUpVoteComment, asyncGiveDownVoteComment } from '../states/threadDetail/action'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import { TbMoodSmile, TbMoodSad } from 'react-icons/tb'
import useInput from '../hooks/useInput'
import UserAvatar from '../components/UserAvatar'
import ThreadInfo from '../components/ThreadInfo'
import ThreadContent from '../components/ThreadContent'
import VoteInfo from '../components/VoteInfo'
import CommentDetail from '../components/CommentDetail'
import TextInput from '../components/TextInput'

const DetailPage = () => {
  const { id } = useParams()
  const { threadDetail = null, users = [], authUser } = useSelector((states) => states)
  const dispatch = useDispatch()
  const [comment, setComment] = useInput()

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id))
    dispatch(asyncPopulateUsersAndThreads())
  }, [id, dispatch])

  const onAddComment = (comment, id) => {
    dispatch(asyncCreateComment({ content: comment, id }))
    setComment('')
  }

  const onGiveUpVoteThread = (id) => {
    dispatch(asyncGiveUpVoteDetail(id))
  }

  const onGiveDownVoteThread = (id) => {
    dispatch(asyncGiveDownVoteDetail(id))
  }

  const onGiveUpVoteComment = ({ threadId, commentId }) => {
    dispatch(asyncGiveUpVoteComment({ threadId, commentId }))
  }

  const onGiveDownVoteComment = ({ threadId, commentId }) => {
    dispatch(asyncGiveDownVoteComment({ threadId, commentId }))
  }

  if (threadDetail === null) {
    return (
      <p>Loading</p>
    )
  }

  return (
    <div className='detail-page'>
      <div className='header-section'>
        <UserAvatar avatar={threadDetail.owner.avatar} name={threadDetail.owner.name} />
        <ThreadInfo category={threadDetail.category} name={threadDetail.owner.name} createdAt={threadDetail.createdAt} />
      </div>
      <ThreadContent title={threadDetail.title} body={threadDetail.body} />
      <div className='vote-section'>
        <VoteInfo users={users} detail={threadDetail} />
        <div className='vote-buttons'>
          <button type='button' onClick={() => onGiveUpVoteThread(threadDetail.id)} disabled={threadDetail.upVotesBy.includes(authUser.id)}>
            <TbMoodSmile className='icons' />
          </button>
          <span>{threadDetail.upVotesBy.length}</span>
          {/* <button type='button'>Neutral</button> */}
          <button type='button' onClick={() => onGiveDownVoteThread(threadDetail.id)} disabled={threadDetail.downVotesBy.includes(authUser.id)}>
            <TbMoodSad className='icons' />
          </button>
          <span>{threadDetail.downVotesBy.length}</span>
        </div>
      </div>
      <div className='comment-section'>
        <div className='form-container'>
          <form className='form-section'>
            <TextInput
                            props={{
                              value: comment,
                              type: 'text',
                              id: 'comment',
                              placeholder: 'Your thought',
                              label: 'Comment',
                              setValue: setComment
                            }}
                        />
            <div>
              <button type='button' onClick={() => onAddComment(comment, threadDetail.id)} disabled={!comment}>Post Comment</button>
            </div>
          </form>
        </div>
        {
                    threadDetail.comments.map((comment, index) =>
                      <div className='comment-detail' key={index} >
                        <CommentDetail comment={comment} />
                        <div className='comment-vote-section'>
                          <VoteInfo users={users} detail={comment} />
                          <div className='vote-buttons'>
                            <button type='button' onClick={() => onGiveUpVoteComment({ threadId: threadDetail.id, commentId: comment.id })} disabled={comment.upVotesBy.includes(authUser.id)}>
                              <TbMoodSmile className='icons' />
                            </button>
                            <span>{comment.upVotesBy.length}</span>
                            {/* <button type='button'>Neutral</button> */}
                            <button type='button' onClick={() => onGiveDownVoteComment({ threadId: threadDetail.id, commentId: comment.id })} disabled={comment.downVotesBy.includes(authUser.id)}>
                              <TbMoodSad className='icons' />
                            </button>
                            <span>{comment.downVotesBy.length}</span>
                          </div>
                        </div>
                      </div>
                    )
                }
      </div>
    </div>
  )
}

export default DetailPage
