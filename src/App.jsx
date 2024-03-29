import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LuArrowUpToLine } from 'react-icons/lu'
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
import ProfileModal from './components/ProfileModal'
import PreloadLoading from './components/PreloadLoading'
import Loading from './components/Loading'
import useInput from './hooks/useInput'
import { asyncCreateThread } from './states/threads/action'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'
import { setMessageActionCreator } from './states/message/action'
import { setLoadingFalseActionCreator, setLoadingTrueActionCreator } from './states/isLoading/action'

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

  const [title, setTitle] = useInput()
  const [body, setBody] = useInput()
  const [category, setCategory] = useInput()

  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [showCreateThreadModal, setShowCreateThreadModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

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
    dispatch(setLoadingTrueActionCreator())
    dispatch(asyncUnsetAuthUser())
    dispatch(setMessageActionCreator({ show: true, error: false, text: 'See You Soon' }))
    navigate('/')
    dispatch(setLoadingFalseActionCreator())
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

  const onCreateThread = async (event) => {
    event.preventDefault()

    dispatch(setLoadingTrueActionCreator())
    const status = await dispatch(asyncCreateThread({ title, body, category }))

    if (status === 'success') {
      setTitle('')
      setBody('')
      setCategory('')
      setShowCreateThreadModal(false)
    }

    dispatch(setLoadingFalseActionCreator())
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
      <header className='sticky top-0 left-0 z-20 lg:z-0 lg:fixed lg:w-2/12 lg:h-screen lg:shadow-2xl lg:bg-white lg:overflow-hidden lg:flex lg:flex-col lg:gap-y-6 lg:px-6 lg:py-4'>
        <div className='w-screen lg:w-full flex lg:flex-col justify-between lg:justify-center lg:gap-y-4 gap-x-4 px-4 py-3 items-center bg-white shadow-md lg:shadow-none md:px-8 lg:px-0'>
          <div className='block lg:hidden'>
            <Link
              to='/'
              className='flex gap-x-3 items-center'
            >
              <img
                src='/favicon.png'
                title='Yuk Ngethread'
                alt='Yuk Ngethread'
                className='w-12 h-12'
              />
              <span className='text-xl font-semibold'>Yuk Ngthread</span>
            </Link>
          </div>
          <UserAvatar
            avatar={authUser.avatar}
            name={authUser.name}
          />
          <p
            title={authUser.name}
            className='hidden lg:block whitespace-nowrap text-ellipsis w-full text-center line-clamp-1'>
            Hi, <span className='font-semibold'>{authUser.name}</span>
          </p>
        </div>
        <Navigation signOut={onSignOut} setShowCreateThreadModal={setShowCreateThreadModal} setShowProfileModal={setShowProfileModal}/>
        <div className='hidden lg:block mt-auto'>
          <Link
            to='/'
            className='flex flex-col w-full gap-y-3 items-center justify-start py-3'
          >
            <img
              src='/favicon.png'
              title='Yuk Ngethread'
              alt='Yuk Ngethread'
              className='w-12 h-12'
            />
            <span className='font-bold whitespace-nowrap text-ellipsis w-full text-center'>Yuk Ngethread</span>
          </Link>
        </div>
      </header>
      <main className='min-w-screen flex overflow-x-auto lg:w-10/12 lg:ml-auto pb-20 lg:pb-0'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/threads/:id' element={<DetailPage />} />
          <Route path='/leaderboard' element={<LeaderboardPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      {
        showScrollToTop &&
        <button onClick={scrollToTop} className='fixed bottom-24 lg:bottom-4 right-3 flex items-center justify-center p-2 w-10 h-10 bg-white rounded-full z-20 border border-gray-500 shadow-md'>
          <LuArrowUpToLine className='w-8 h-8'/>
        </button>
      }
      <ProfileModal authUser={authUser} showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal} />
      <CreateThreadModal props={{ authUser, showCreateThreadModal, setShowCreateThreadModal, title, body, category, setTitle, setBody, setCategory, onCreateThread }} />
      <Message message={message} />
      <Loading isLoading={isLoading} />
    </>
  )
}

export default App
