
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TbFilter } from 'react-icons/tb'
import { asyncCreateComment, asyncGiveUpVote, asyncGiveDownVote } from '../states/threads/action'
import useInput from '../hooks/useInput'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import ThreadPreview from '../components/ThreadPreview'

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

  const filterCategory = (threads) => {
    return threads.filter(item => item.category.toLowerCase().match(filterQuery.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()) !== null)
  }

  return (
    <div className='container mx-auto'>
      <div>
        <div>
          <button>
            <TbFilter/>
            <h3>Filter</h3>
          </button>
        </div>
        <div>
          {
            categoryList.map((category, index) =>
              <button
                key={index}
                onClick={() => changeCategory(category)}
              >
                {category}
              </button>
            )
          }
        </div>
      </div>
      <div>
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
