import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncGiveUpVoteDetail,
  asyncGiveDownVoteDetail,
  asyncGiveUpVoteComment,
  asyncGiveDownVoteComment,
  receiveThreadDetailActionCreator
} from '../states/threadDetail/action'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import { TbMoodSmile, TbMoodSad } from 'react-icons/tb'
import useInput from '../hooks/useInput'
import UserAvatar from '../components/UserAvatar'
import ThreadInfo from '../components/ThreadInfo'
import ThreadContent from '../components/ThreadContent'
import VoteInfo from '../components/VoteInfo'
import CommentDetail from '../components/CommentDetail'
import TextInput from '../components/TextInput'
import PreloadLoading from '../components/PreloadLoading'
import { setMessageActionCreator } from '../states/message/action'

const DetailPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const [comment, setComment] = useInput()
  const { threadDetail = null, users = [], authUser } = useSelector((states) => states)

  useEffect(() => {
    init()
  }, [id, dispatch])

  const init = async () => {
    await dispatch(asyncPopulateUsersAndThreads())
    const { status = 'fail', message = '', data = null } = await dispatch(asyncReceiveThreadDetail(id))

    if (status !== 'fail') {
      dispatch(receiveThreadDetailActionCreator(data.detailThread))
    } else {
      dispatch(setMessageActionCreator({ error: true, text: message }))
      setTimeout(() => { navigate('/') }, 2000)
    }
  }

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
    return <PreloadLoading />
  }

  return (
    <div>
      <div>
        <UserAvatar
          avatar={threadDetail.owner.avatar}
          name={threadDetail.owner.name}
        />
        <ThreadInfo
          category={threadDetail.category}
          name={threadDetail.owner.name}
          createdAt={threadDetail.createdAt}
        />
      </div>
      <ThreadContent
        title={threadDetail.title}
        body={threadDetail.body}
      />
      <div>
        <VoteInfo
          users={users}
          detail={threadDetail}
        />
        <div>
          <button
            type='button'
            onClick={() => onGiveUpVoteThread(threadDetail.id)}
            disabled={threadDetail.upVotesBy.includes(authUser.id)}
          >
            <TbMoodSmile/>
          </button>
          <span>{threadDetail.upVotesBy.length}</span>
          <button
            type='button'
            onClick={() => onGiveDownVoteThread(threadDetail.id)}
            disabled={threadDetail.downVotesBy.includes(authUser.id)}
          >
            <TbMoodSad/>
          </button>
          <span>{threadDetail.downVotesBy.length}</span>
        </div>
      </div>
      <div>
        <div >
          <form>
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
              <button
                type='button'
                onClick={() => onAddComment(comment, threadDetail.id)}
                disabled={!comment}
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
        {
          threadDetail.comments.map((comment, index) =>
            <div key={index} >
              <CommentDetail comment={comment} />
              <div>
                <VoteInfo
                  users={users}
                  detail={comment}
                />
                <div>
                  <button
                    type='button'
                    onClick={() => onGiveUpVoteComment({ threadId: threadDetail.id, commentId: comment.id })}
                    disabled={comment.upVotesBy.includes(authUser.id)}
                  >
                    <TbMoodSmile/>
                  </button>
                  <span>{comment.upVotesBy.length}</span>
                  <button
                    type='button'
                    onClick={() => onGiveDownVoteComment({ threadId: threadDetail.id, commentId: comment.id })}
                    disabled={comment.downVotesBy.includes(authUser.id)}
                  >
                    <TbMoodSad/>
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
