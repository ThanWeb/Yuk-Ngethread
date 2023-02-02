import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getFormattedDateString } from '../utils'

const ThreadPreview = ({ thread, users }) => {
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        findOwnerThread(thread.ownerId)
    }, [])

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
                <div className='owner-avatar'>
                    <img src={avatar} alt={name} title={name} />
                </div>
                <div className='thread-info'>
                    <h3 className='owner-info'>{name}</h3>
                    <p className='thread-category'>{thread.category}</p>
                    <p className='thread-created'>{getFormattedDateString(thread.createdAt)}</p>
                </div>
            </div>
            <div className='content-section'>
                <h4 className='thread-title'>{thread.title}</h4>
                <p className='thread-body'>{thread.body}</p>
            </div>
            <div className='comment-section'>
            </div>
        </div>
    )
}

ThreadPreview.propTypes = {
    thread: PropTypes.object,
    users: PropTypes.array
}

export default ThreadPreview
