
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncCreateComment, asyncGiveUpVote, asyncGiveDownVote } from '../states/threads/action'
import useInput from '../hooks/useInput'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import ThreadPreview from '../components/ThreadPreview'
import { setLoadingFalseActionCreator, setLoadingTrueActionCreator } from '../states/isLoading/action'

const HomePage = () => {
  const dispatch = useDispatch()

  const { threads = [], users = [], authUser } = useSelector((states) => states)
  const [filterQuery, setFilterQuery] = useInput()
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    collectCategories()
  }, [threads])

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
  }, [dispatch])

  const onGiveUpVote = async (id) => {
    await dispatch(asyncGiveUpVote(id, authUser.id))
  }

  const onGiveDownVote = async (id) => {
    await dispatch(asyncGiveDownVote(id, authUser.id))
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

  const onAddComment = async (comment, id) => {
    dispatch(setLoadingTrueActionCreator())
    await dispatch(asyncCreateComment({ content: comment, id }))
    dispatch(setLoadingFalseActionCreator())
  }

  const changeCategory = (category) => {
    if (filterQuery === category) {
      setFilterQuery('')
    } else {
      setFilterQuery(category)
    }
  }

  const filterCategory = (threads) => {
    return threads.filter(item => item.category.toLowerCase().match(filterQuery.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()) !== null)
  }

  return (
    <div className='container mx-auto'>
      <div className='px-6 pt-6'>
        <div className='flex flex-wrap gap-3'>
          {
            categoryList.map((category, index) =>
              <button
                key={index}
                onClick={() => changeCategory(category)}
                className={`p-2 rounded-xl shadow-md ${category === filterQuery ? 'bg-cyan-900 text-white' : 'bg-white'}`}
              >
                #{category}
              </button>
            )
          }
        </div>
      </div>
      <div className='flex flex-col gap-y-6 p-6'>
        {
          filterCategory(threads).map((thread, index) =>
            <ThreadPreview
              key={index}
              thread={thread}
              users={users}
              authUser={authUser}
              onAddComment={onAddComment}
              onGiveUpVote={onGiveUpVote}
              onGiveDownVote={onGiveDownVote}
            />
          )
        }
      </div>
    </div>
  )
}

export default HomePage
