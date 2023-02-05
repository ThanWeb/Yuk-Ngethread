import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'
import TextInput from '../components/TextInput'
import UserAvatar from '../components/UserAvatar'
import ThreadInfo from '../components/ThreadInfo'
import ThreadContent from '../components/ThreadContent'
import VoteInfo from '../components/VoteInfo'

const ThreadPreview = ({ thread, users, authUser, onAddComment, filterQuery }) => {
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

    if (!avatar || !name) {
        return (
            <p>Loading</p>
        )
    }

    return (
        <div className={!thread.category.toLowerCase().includes(filterQuery.toLowerCase()) ? 'hidden thread-preview' : 'thread-preview'}>
            <div className='header-section'>
                <UserAvatar avatar={avatar} name={name} />
                <ThreadInfo category={thread.category} name={name} createdAt={thread.createdAt} />
            </div>
            <ThreadContent title={thread.title} body={thread.body} id={thread.id} />
            <div className='response-section'>
                <VoteInfo users={users} detail={thread} />
                {
                    thread.totalComments > 1
                        ? <p>{thread.totalComments} comments</p>
                        : <p>{thread.totalComments} comment</p>
                }
            </div>
            <div className='interactive-section'>
                <div className='buttons-section'>
                    <button type='button' onClick={() => toggleShowSection(true)}>Vote</button>
                    <button type='button' onClick={() => toggleShowSection(false)}>Comment</button>
                    <Link to={`/threads/${thread.id}`}>More</Link>
                </div>
                <div className='add-response-section'>
                    {
                        showVoteSection || showCommentSection
                            ? <div className='user-section'>
                                <img src={authUser.avatar} alt={authUser.name} title={authUser.name} />
                                <span>{authUser.name}</span>
                            </div>
                            : null
                    }
                    {
                        showVoteSection &&
                        <div className='vote-section'>
                            <button type='button'>Up</button>
                            {/* <button type='button'>Neutral</button> */}
                            <button type='button'>Down</button>
                        </div>
                    }
                    {
                        showCommentSection &&
                        <div className='comment-section'>
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
                                    <button type='button' onClick={() => addCommentHandler(comment, thread.id)} disabled={!comment}>Post Comment</button>
                                </div>
                            </form>
                        </div>
                    }
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
    filterQuery: PropTypes.string
}

export default ThreadPreview
