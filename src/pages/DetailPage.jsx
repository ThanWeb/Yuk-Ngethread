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
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike, AiOutlineSend, AiOutlineMessage } from 'react-icons/ai'
import useInput from '../hooks/useInput'
import UserAvatar from '../components/UserAvatar'
import ThreadInfo from '../components/ThreadInfo'
import ThreadContent from '../components/ThreadContent'
import VoteInfo from '../components/VoteInfo'
import CommentDetail from '../components/CommentDetail'
import PreloadLoading from '../components/PreloadLoading'
import { setMessageActionCreator } from '../states/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '../states/isLoading/action'
import { getFormattedDateString } from '../utils'

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
      dispatch(setMessageActionCreator({ show: true, error: true, text: message }))
      setTimeout(() => { navigate('/') }, 2000)
    }
  }

  const onAddComment = async (event, comment, id) => {
    event.preventDefault()
    dispatch(setLoadingTrueActionCreator())

    const status = await dispatch(asyncCreateComment({ content: comment, id }))

    if (status === 'success') {
      setComment('')
    }

    dispatch(setLoadingFalseActionCreator())
  }

  const onGiveUpVoteThread = async (id) => {
    await dispatch(asyncGiveUpVoteDetail(id))
  }

  const onGiveDownVoteThread = async (id) => {
    await dispatch(asyncGiveDownVoteDetail(id))
  }

  const onGiveUpVoteComment = async ({ threadId, commentId }) => {
    await dispatch(asyncGiveUpVoteComment({ threadId, commentId }))
  }

  const onGiveDownVoteComment = async ({ threadId, commentId }) => {
    await dispatch(asyncGiveDownVoteComment({ threadId, commentId }))
  }

  if (threadDetail === null || threadDetail.id !== id) {
    return <PreloadLoading />
  }

  return (
    <div className='container mx-auto'>
      <div className='px-6 pt-6'>
        <div className='bg-white p-5 rounded-xl shadow-md'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex gap-x-4 items-center pb-1'>
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
            <div className='border-b-2'/>
            <ThreadContent
              title={threadDetail.title}
              body={threadDetail.body}
            />
            <p className='text-sm text-gray-500 italic'>{getFormattedDateString(threadDetail.createdAt)}</p>
            <div className='mt-3 text-sm text-gray-600'>
              <VoteInfo
                users={users}
                detail={threadDetail}
              />
            </div>
            <div className='pt-5 flex justify-start gap-x-6'>
              <button
                type='button'
                onClick={() => onGiveUpVoteThread(threadDetail.id)}
                disabled={threadDetail.upVotesBy.includes(authUser.id)}
                data-testid='up-vote-button'
                className='flex gap-x-1 items-center'
              >
                {
                  threadDetail.upVotesBy.includes(authUser.id)
                    ? <AiFillLike className='w-6 h-6 text-slate-700'/>
                    : <AiOutlineLike className='w-6 h-6 text-slate-700'/>
                }
                <span className='text-slate-700'>{threadDetail.upVotesBy.length}</span>
              </button>
              <button
                type='button'
                onClick={() => onGiveDownVoteThread(threadDetail.id)}
                disabled={threadDetail.downVotesBy.includes(authUser.id)}
                data-testid='down-vote-button'
                className='flex gap-x-1 items-center'
              >
                {
                  threadDetail.downVotesBy.includes(authUser.id)
                    ? <AiFillDislike className='w-6 h-6 text-slate-700'/>
                    : <AiOutlineDislike className='w-6 h-6 text-slate-700'/>
                }
                <span className='text-slate-700'>{threadDetail.downVotesBy.length}</span>
              </button>
              <div className='flex gap-x-1 items-center'>
                <AiOutlineMessage className='w-6 h-6 text-slate-700'/>
                <span className='text-slate-700'>{threadDetail.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='p-6'>
          <form onSubmit={(event) => { onAddComment(event, comment, threadDetail.id) }} className='bg-white h-fit p-5 w-full flex items-center gap-x-3 overflow-hidden rounded-xl shadow-md'>
            <img
              src={authUser.avatar}
              alt={authUser.name}
              title={authUser.name}
              className='w-10 h-10 rounded-full'
            />
            <input
              type='text'
              value={comment}
              onChange={setComment}
              placeholder='Comment here'
              className='border rounded-xl py-2 px-3 bg-white w-full'
              required
            />
            <button
              type='submit'
              onClick={(event) => onAddComment(event, comment, threadDetail.id)}
              disabled={!comment}
              className='w-8 h-8'
            >
              <AiOutlineSend className='w-7 h-7 text-slate-700'/>
            </button>
          </form>
        </div>
        <div className='h-fit flex flex-col gap-y-6 px-6 pb-6'>
          {
            threadDetail.comments.map((comment, index) =>
              <div key={index} className='p-5 bg-white rounded-xl shadow-md'>
                <CommentDetail comment={comment} />
                <div>
                  <div className='mt-3 text-sm text-gray-600'>
                    <VoteInfo
                      users={users}
                      detail={comment}
                    />
                  </div>
                  <div className='pt-5 flex justify-start gap-x-6'>
                    <button
                      type='button'
                      onClick={() => onGiveUpVoteComment({ threadId: threadDetail.id, commentId: comment.id })}
                      disabled={comment.upVotesBy.includes(authUser.id)}
                      data-testid='up-vote-button'
                      className='flex gap-x-1 items-center'
                    >
                      {
                        threadDetail.upVotesBy.includes(authUser.id)
                          ? <AiFillLike className='w-6 h-6 text-slate-700'/>
                          : <AiOutlineLike className='w-6 h-6 text-slate-700'/>
                      }
                      <span className='text-slate-700'>{threadDetail.upVotesBy.length}</span>
                    </button>
                    <button
                      type='button'
                      onClick={() => onGiveDownVoteComment({ threadId: threadDetail.id, commentId: comment.id })}
                      disabled={comment.downVotesBy.includes(authUser.id)}
                      data-testid='down-vote-button'
                      className='flex gap-x-1 items-center'
                    >
                      {
                        threadDetail.downVotesBy.includes(authUser.id)
                          ? <AiFillDislike className='w-6 h-6 text-slate-700'/>
                          : <AiOutlineDislike className='w-6 h-6 text-slate-700'/>
                      }
                      <span className='text-slate-700'>{threadDetail.downVotesBy.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default DetailPage
