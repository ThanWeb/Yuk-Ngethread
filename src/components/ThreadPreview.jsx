import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'
import { TbMessage2, TbSquarePlus, TbMoodSmile, TbMoodSad, TbListDetails } from 'react-icons/tb'
import TextInput from '../components/TextInput'
import UserAvatar from '../components/UserAvatar'
import ThreadInfo from '../components/ThreadInfo'
import ThreadContent from '../components/ThreadContent'
import VoteInfo from '../components/VoteInfo'

const ThreadPreview = ({ thread, users, authUser, onAddComment, onGiveUpVote, onGiveDownVote }) => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [showCommentSection, setShowCommentSection] = useState(false)
  const [showVoteSection, setShowVoteSection] = useState(false)
  const [comment, setComment] = useInput()

  useEffect(() => {
    findOwnerThread(thread.ownerId)
  }, [thread])

  const toggleShowSection = (voteSection) => {
    if (voteSection) {
      setShowVoteSection(true)

      if (showCommentSection) {
        setShowCommentSection(false)
      }
    } else {
      setShowCommentSection(true)

      if (showVoteSection) {
        setShowVoteSection(false)
      }
    }
  }

  const findOwnerThread = (id) => {
    const currentUser = users.find((user) => user.id === id)
    setAvatar(currentUser.avatar)
    setName(currentUser.name)
  }

  const addCommentHandler = (comment, id) => {
    onAddComment(comment, id)
    setComment('')
  }

  return (
    <div>
      <div>
        <div>
          <UserAvatar
            avatar={avatar}
            name={name}
          />
          <ThreadInfo
            category={thread.category}
            name={name}
            createdAt={thread.createdAt}
          />
        </div>
        <ThreadContent
          title={thread.title}
          body={thread.body}
          id={thread.id}
        />
        <div>
          <VoteInfo
            users={users}
            detail={thread}
          />
          {
            thread.totalComments > 1
              ? <p>{thread.totalComments} comments</p>
              : <p>{thread.totalComments} comment</p>
          }
        </div>
      </div>
      <div>
        <div>
          <div>
            <button
              type='button'
              onClick={() => toggleShowSection(true)}
              data-testid='open-votes-button'
            >
              <span>Vote</span>
              <TbSquarePlus/>
            </button>
            <button
              type='button'
              onClick={() => toggleShowSection(false)}
            >
              <span>Comment</span>
              <TbMessage2/>
            </button>
            <Link to={`/threads/${thread.id}`}>
              <span>More</span>
              <TbListDetails/>
            </Link>
          </div>
          <div>
            {
              showVoteSection || showCommentSection
                ? <div>
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    title={authUser.name}
                  />
                </div>
                : null
            }
            {
              showVoteSection &&
              <div>
                <span>Vote</span>
                <button
                  type='button'
                  onClick={() => onGiveUpVote(thread.id)}
                  disabled={thread.upVotesBy.includes(authUser.id)}
                  data-testid='up-vote-button'
                >
                  <TbMoodSmile/>
                </button>
                <span data-testid='up-vote-total'>{thread.upVotesBy.length}</span>
                <button
                  type='button'
                  onClick={() => onGiveDownVote(thread.id)}
                  disabled={thread.downVotesBy.includes(authUser.id)}
                  data-testid='down-vote-button'
                >
                  <TbMoodSad/>
                </button>
                <span data-testid='down-vote-total'>{thread.downVotesBy.length}</span>
              </div>
            }
            {
              showCommentSection &&
              <div>
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
                  <button
                    type='button'
                    onClick={() => addCommentHandler(comment, thread.id)}
                    disabled={!comment}
                  >
                    Send
                  </button>
                </form>
              </div>
            }
          </div>
        </div>
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
