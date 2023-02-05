
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { asyncCreateThread, asyncCreateComment, receiveThreadsActionCreator } from '../states/threads/action'
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
    const [filterQuery, setFilterQuery] = useInput()
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        collectCategories()
    }, [threads])

    useEffect(() => {
        dispatch(asyncPopulateUsersAndThreads())
    }, [dispatch])

    const onCreateThread = (title, body, category) => {
        dispatch(asyncCreateThread({ title, body, category }))
        setTitle('')
        setBody('')
        setCategory('')
    }

    const collectCategories = () => {
        const tempCategoryList = []
        threads.forEach(thread => {
            if (!tempCategoryList.includes(thread.category)) {
                tempCategoryList.push(thread.category)
            }
        })
        setCategoryList(tempCategoryList)
    }

    const onAddComment = (comment, id) => {
        dispatch(asyncCreateComment({ content: comment, id }))
    }

    const changeCategory = (category) => {
        if (filterQuery === category) {
            setFilterQuery('')
        } else {
            setFilterQuery(category)
        }
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
            <div className='filter-section'>
                {
                    categoryList.map((category, index) =>
                        <button key={index} onClick={() => changeCategory(category)}>{category}</button>
                    )
                }
            </div>
            <div className='thread-list'>
                {
                    threads.map((thread, index) =>
                        <ThreadPreview key={index} thread={thread} users={users} authUser={authUser} onAddComment={onAddComment} filterQuery={filterQuery}/>
                    )
                }
            </div>
        </div>
    )
}

export default HomePage
