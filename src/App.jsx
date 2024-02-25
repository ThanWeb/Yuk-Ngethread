import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import LeaderboardPage from './pages/LeaderboardPage'
import RegisterPage from './pages/RegisterPage'
import DetailPage from './pages/DetailPage'
import NotFoundPage from './pages/NotFoundPage'
import Navigation from './components/Navigation'
import UserAvatar from './components/UserAvatar'
import Message from './components/Message'
import CreateThreadModal from './components/CreateThreadModal'
import PreloadLoading from './components/PreloadLoading'
import Loading from './components/Loading'
import useInput from './hooks/useInput'
import { asyncCreateThread } from './states/threads/action'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'
import { setMessageActionCreator } from './states/message/action'
import { TbArrowBigUpLine } from 'react-icons/tb'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const {
    authUser = null,
    isPreload = false,
    message = null,
    isLoading = false
  } = useSelector((states) => states)

  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [title, setTitle] = useInput()
  const [body, setBody] = useInput()
  const [category, setCategory] = useInput()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    if (message.show) {
      setTimeout(() => {
        const { error, text } = message
        dispatch(setMessageActionCreator({ show: false, error, text }))
      }, 2000)
    }
  }, [message])

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser())
    dispatch(setMessageActionCreator({ show: true, error: false, text: 'See You Soon' }))
    navigate('/')
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const checkScrollPosition = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 50) {
      setShowScrollToTop(true)
    } else if (scrolled <= 50) {
      setShowScrollToTop(false)
    }
  }

  const onCreateThread = (event) => {
    dispatch(asyncCreateThread({ title, body, category }))
    setTitle('')
    setBody('')
    setCategory('')
  }

  window.addEventListener('scroll', checkScrollPosition)

  if (isPreload) {
    return <PreloadLoading />
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
        <Message message={message} />
        <Loading isLoading={isLoading} />
      </>
    )
  }

  return (
    <>
      <header className='sticky top-0 left-0'>
        <div className='w-screen flex justify-between gap-x-4 px-4 py-2 items-center bg-white shadow-md md:px-8 md:py-3'>
          <div>
            <img
              src='/favicon.png'
              title='Yuk Ngethread'
              alt='Yuk Ngethread'
              className='w-12 h-12'
            />
          </div>
          <UserAvatar
            avatar={authUser.avatar}
            name={authUser.name}
          />
        </div>
        <Navigation signOut={onSignOut} />
      </header>
      <main className='min-w-screen min-h-screen flex bg-gray-200 overflow-x-auto'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/threads/:id' element={<DetailPage />} />
          <Route path='/leaderboard' element={<LeaderboardPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      {
        showScrollToTop &&
        <button onClick={scrollToTop}>
          <TbArrowBigUpLine/>
        </button>
      }
      <CreateThreadModal props={{ title, body, category, setTitle, setBody, setCategory, onCreateThread }} />
      <Message message={message} />
      <Loading isLoading={isLoading} />
    </>
  )
}

export default App
