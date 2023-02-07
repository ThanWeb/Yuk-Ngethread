import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveThreadDetail, asyncCreateComment, asyncGiveUpVoteDetail, asyncGiveDownVoteDetail } from '../states/threadDetail/action'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
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
                    <button type='button' onClick={() => onGiveUpVoteThread(threadDetail.id)} disabled={threadDetail.upVotesBy.includes(authUser.id)}>Up</button>
                    {/* <button type='button'>Neutral</button> */}
                    <button type='button' onClick={() => onGiveDownVoteThread(threadDetail.id)} disabled={threadDetail.downVotesBy.includes(authUser.id)}>Down</button>
                </div>
            </div>
            <div className='comment-section'>
                <div className='user-section'>
                    <img src={authUser.avatar} alt={authUser.name} title={authUser.name} />
                    <span>{authUser.name}</span>
                </div>
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
                                    <button type='button'>Up</button>
                                    {/* <button type='button'>Neutral</button> */}
                                    <button type='button'>Down</button>
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
