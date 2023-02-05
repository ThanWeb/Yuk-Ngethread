
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncCreateThread, asyncCreateComment } from '../states/threads/action'
import useInput from '../hooks/useInput'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import ThreadPreview from '../components/ThreadPreview'
import TextInput from '../components/TextInput'

const HomePage = () => {
    const { threads = [], users = [], authUser } = useSelector((states) => states)
    const dispatch = useDispatch()
    const [title, setTitle] = useInput()
    const [body, setBody] = useInput()
    const [category, setCategory] = useInput()

    useEffect(() => {
        dispatch(asyncPopulateUsersAndThreads())
    }, [dispatch])

    const onCreateThread = (title, body, category) => {
        dispatch(asyncCreateThread({ title, body, category }))
        setTitle('')
        setBody('')
        setCategory('')
    }

    const onAddComment = (comment, id) => {
        dispatch(asyncCreateComment({ content: comment, id }))
        dispatch(asyncPopulateUsersAndThreads())
    }

    return (
        <div className='home-page'>
            <div className='create-thread'>
                <div className='intro'>
                    <h3>What is going on inside your head?</h3>
                </div>
                <div className='form-container'>
                    <form>
                        <TextInput
                            props={{
                                value: title,
                                type: 'text',
                                id: 'title',
                                placeholder: 'Title please',
                                label: 'Title',
                                setValue: setTitle
                            }}
                        />
                        <div className='input-field'>
                            <label htmlFor='body'>Content</label>
                            <textarea id='body' type='text' value={body} onChange={setBody} placeholder='Your thoughts' required/>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='body'>Category</label>
                            <input id='body' type='text' value={category} onChange={setCategory} placeholder='What category'/>
                        </div>
                        <div>
                            <button type='button' onClick={() => onCreateThread(title, body, category)} disabled={!title || !body}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='thread-list'>
                {
                    threads.map((thread, index) =>
                        <ThreadPreview key={index} thread={thread} users={users} authUser={authUser} onAddComment={onAddComment} />
                    )
                }
            </div>
        </div>
    )
}

export default HomePage
