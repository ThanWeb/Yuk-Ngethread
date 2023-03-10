
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TbCircleCheck, TbFilter } from 'react-icons/tb'
import { asyncCreateThread, asyncCreateComment, asyncGiveUpVote, asyncGiveDownVote } from '../states/threads/action'
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

    const onGiveUpVote = (id) => {
        dispatch(asyncGiveUpVote(id))
    }

    const onGiveDownVote = (id) => {
        dispatch(asyncGiveDownVote(id))
    }

    const collectCategories = () => {
        const tempCategoryList = []
        threads.forEach(thread => {
            if (!tempCategoryList.includes(thread.category)) {
                if (thread.category !== 'general') {
                    tempCategoryList.push(thread.category)
                }
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
            <div id='create-thread' className='create-thread'>
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
                            <button type='button' onClick={() => onCreateThread(title, body, category)} disabled={!title || !body}>
                                <span>Create</span>
                                <TbCircleCheck className='icons' />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div id='filter-section' className='filter-section'>
                <div className='filter'>
                    <button>
                        <TbFilter className='icons' />
                        <h3>Filter</h3>
                    </button>
                </div>
                <div className='buttons'>
                    {
                        categoryList.map((category, index) =>
                            <button key={index} className={filterQuery === category ? 'selected' : ''} onClick={() => changeCategory(category)}>{category}</button>
                        )
                    }
                </div>
            </div>
            <div className='thread-list'>
                {
                    threads.map((thread, index) =>
                        <ThreadPreview key={index} thread={thread} users={users} authUser={authUser} onAddComment={onAddComment} filterQuery={filterQuery} onGiveUpVote={onGiveUpVote} onGiveDownVote={onGiveDownVote} />
                    )
                }
            </div>
        </div>
    )
}

export default HomePage
