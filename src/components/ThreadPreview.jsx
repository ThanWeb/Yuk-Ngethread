import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike, AiOutlineMessage, AiOutlineMore, AiOutlineSend } from 'react-icons/ai'
import UserAvatar from '../components/UserAvatar'
import ThreadInfo from '../components/ThreadInfo'
import ThreadContent from '../components/ThreadContent'
import VoteInfo from '../components/VoteInfo'
import { getFormattedDateString } from '../utils'

const ThreadPreview = ({ thread, users, authUser, onAddComment, onGiveUpVote, onGiveDownVote }) => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [showCommentSection, setShowCommentSection] = useState(false)
  const [comment, setComment] = useInput()

  useEffect(() => {
    findOwnerThread(thread.ownerId)
  }, [thread])

  const findOwnerThread = (id) => {
    const currentUser = users.find((user) => user.id === id)
    setAvatar(currentUser.avatar)
    setName(currentUser.name)
  }

  const addCommentHandler = async (event, comment, id) => {
    const status = await onAddComment(event, comment, id)

    if (status === 'success') {
      setComment('')
    }
  }

  return (
    <div className='bg-white p-5 rounded-xl shadow-md'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex gap-x-4 items-center pb-1'>
          <UserAvatar
            avatar={avatar}
            name={name}
          />
          <ThreadInfo
            category={thread.category}
            name={name}
          />
        </div>
        <div className='border-b-2'/>
        <ThreadContent
          title={thread.title}
          body={thread.body}
          id={thread.id}
        />
        <p className='text-sm text-gray-500 italic'>{getFormattedDateString(thread.createdAt)}</p>
        <div className='mt-3 text-sm text-gray-600'>
          <VoteInfo
            users={users}
            detail={thread}
          />
          {
            thread.totalComments > 1
              ? <p className='mt-1'><span className='font-semibold'>{thread.totalComments}</span> comments</p>
              : <p className='mt-1'><span className='font-semibold'>{thread.totalComments}</span> comment</p>
          }
        </div>
      </div>
      <div className='pt-5'>
        <div className={`flex justify-start gap-x-6 ${showCommentSection ? 'mb-5' : ''}`}>
          <button
            type='button'
            onClick={() => onGiveUpVote(thread.id)}
            disabled={thread.upVotesBy.includes(authUser.id)}
            data-testid='up-vote-button'
            className='flex gap-x-1 items-center'
          >
            {
              thread.upVotesBy.includes(authUser.id)
                ? <AiFillLike className='w-6 h-6 text-slate-700'/>
                : <AiOutlineLike className='w-6 h-6 text-slate-700'/>
            }
            <span className='text-slate-700'>{thread.upVotesBy.length}</span>
          </button>
          <button
            type='button'
            onClick={() => onGiveDownVote(thread.id)}
            disabled={thread.downVotesBy.includes(authUser.id)}
            data-testid='down-vote-button'
            className='flex gap-x-1 items-center'
          >
            {
              thread.downVotesBy.includes(authUser.id)
                ? <AiFillDislike className='w-6 h-6 text-slate-700'/>
                : <AiOutlineDislike className='w-6 h-6 text-slate-700'/>
            }
            <span className='text-slate-700'>{thread.downVotesBy.length}</span>
          </button>
          <button
            type='button'
            onClick={() => setShowCommentSection(!showCommentSection)}
          >
            <AiOutlineMessage className={`w-6 h-6 ${showCommentSection ? 'text-blue-600' : 'text-slate-700'}`}/>
          </button>
          <Link to={`/threads/${thread.id}`} className='ml-auto'>
            <AiOutlineMore className='w-6 h-6 text-slate-700'/>
          </Link>
        </div>
        <form onSubmit={(event) => { addCommentHandler(event, comment, thread.id) }} className={`${showCommentSection ? 'h-fit pt-5 border-t-2' : 'h-0'} w-full flex items-center gap-x-3 overflow-hidden`}>
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
            placeholder='Your thought'
            className='border rounded-xl py-2 px-3 bg-white w-full'
            required
          />
          <button
            type='submit'
            disabled={!comment}
            className='w-8 h-8'
          >
            <AiOutlineSend className='w-7 h-7 text-slate-700'/>
          </button>
        </form>
      </div>
    </div>
  )
}

ThreadPreview.propTypes = {
  thread: PropTypes.object,
  users: PropTypes.array,
  authUser: PropTypes.object,
  onAddComment: PropTypes.func,
  filterQuery: PropTypes.string,
  onGiveUpVote: PropTypes.func,
  onGiveDownVote: PropTypes.func
}

export default ThreadPreview
