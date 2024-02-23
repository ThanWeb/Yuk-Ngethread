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
import PreloadLoading from './components/PreloadLoading'
import Loading from './components/Loading'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'
import { setMessageActionCreator } from './states/message/action'
import { TbArrowBigUpLine } from 'react-icons/tb'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const {
    authUser = null,
    isPreload = false,
    message = null,
    isLoading = false
  } = useSelector((states) => states)

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

  window.addEventListener('scroll', checkScrollPosition)

  if (isPreload) {
    return <PreloadLoading />
  }

  if (authUser === null) {
    return (
      <>
        <main className='min-w-screen min-h-screen'>
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
      <header>
        <div>
          <div>
            <img
              src='/favicon.png'
              title='Yuk Ngethread'
              alt='Yuk Ngethread'
            />
            <h3>Yuk Ngethread</h3>
          </div>
          <div>
            <UserAvatar
              avatar={authUser.avatar}
              name={authUser.name}
            />
            <span>{authUser.name}</span>
          </div>
        </div>
        <Navigation signOut={onSignOut} />
      </header>
      <main className='min-w-screen min-h-screen'>
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
      <Message message={message} />
      <Loading isLoading={isLoading} />
    </>
  )
}

export default App
