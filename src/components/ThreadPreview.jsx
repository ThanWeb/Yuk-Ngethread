import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'
import parse from 'html-react-parser'
import { findWhoGiveVote } from '../utils'
import TextInput from '../components/TextInput'
import ThreadOwner from '../components/ThreadOwner'
import ThreadInfo from '../components/ThreadInfo'

const ThreadPreview = ({ thread, users, authUser }) => {
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [showCommentSection, setShowCommentSection] = useState(false)
    const [showVoteSection, setShowVoteSection] = useState(false)
    const [comment, setComment] = useInput()

    useEffect(() => {
        findOwnerThread(thread.ownerId)
    }, [])

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

    if (!avatar || !name) {
        return (
            <p>Loading</p>
        )
    }

    return (
        <div className='thread-preview'>
            <div className='header-section'>
                <ThreadOwner avatar={avatar} name={name} />
                <ThreadInfo category={thread.category} id={thread.id} title={thread.title} createdAt={thread.createdAt} />
            </div>
            <div className='content-section'>
                <h4 className='thread-title'>{thread.title}</h4>
                <p className='thread-body'>{parse(thread.body)}</p>
            </div>
            <div className='responses-section'>
                <div className='info-response'>
                    {
                        thread.upVotesBy.length + thread.downVotesBy.length > 0
                            ? <p>
                                <span>{findWhoGiveVote(users, thread.upVotesBy[thread.upVotesBy.length - 1])}</span>
                                {
                                    thread.upVotesBy.length + thread.downVotesBy.length > 1 &&
                                    <span> and {thread.upVotesBy.length + thread.downVotesBy.length - 1} more</span>
                                }
                                <span> give a vote</span>
                            </p>
                            : <p>No one voted</p>
                    }
                    {
                        thread.totalComments > 1
                            ? <p>{thread.totalComments} comments</p>
                            : <p>{thread.totalComments} comment</p>
                    }
                </div>
            </div>
            <div className='interactive-section'>
                <button type='button' onClick={() => toggleShowSection(true)}>Vote</button>
                <button type='button' onClick={() => toggleShowSection(false)}>Comment</button>
                <Link to={`/threads/${thread.id}`}>More</Link>
            </div>
            {
                showVoteSection &&
                <div className='vote-section'>
                    <div className='user-section'>
                        <img src={authUser.avatar} alt={authUser.name} title={authUser.name} />
                        <span>{authUser.name}</span>
                    </div>
                    <div className='buttons-section'>
                        <button type='button'>Up</button>
                        <button type='button'>Neutral</button>
                        <button type='button'>Down</button>
                    </div>
                </div>
            }
            {
                showCommentSection &&
                <div className='comment-section'>
                    <div className='user-section'>
                        <img src={authUser.avatar} alt={authUser.name} title={authUser.name} />
                        <span>{authUser.name}</span>
                    </div>
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
                            <button type='button'>Post Comment</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

ThreadPreview.propTypes = {
    thread: PropTypes.object,
    users: PropTypes.array,
    authUser: PropTypes.object
}

export default ThreadPreview
