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
import Loading from './components/Loading'
import UserAvatar from './components/UserAvatar'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'
import { TbArrowBigUpLine } from 'react-icons/tb'

const App = () => {
    const { authUser = null, isPreload = false } = useSelector((states) => states)
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(asyncPreloadProcess())
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const onSignOut = () => {
        dispatch(asyncUnsetAuthUser())
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
        return null
    }

    if (authUser === null) {
        return (
            <div className='container'>
                <main>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Loading />
            </div>
        )
    }

    return (
        <div className="container">
            <header className='main-header'>
                <div className='top-header'>
                    <div className='title'>
                        <img src='favicon.png' title='Yuk Ngethread' alt='Yuk Ngethread'/>
                        <h3>Yuk Ngethread</h3>
                    </div>
                    <div className='profile'>
                        <UserAvatar avatar={authUser.avatar} name={authUser.name} />
                        <span>{authUser.name}</span>
                    </div>
                </div>
                <Navigation signOut={onSignOut} />
            </header>
            <main className='logged-in'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/threads/:id" element={<DetailPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Loading />
            {
                showScrollToTop &&
                <button className='scroll-to-top' onClick={scrollToTop}>
                    <TbArrowBigUpLine className='icons' />
                </button>
            }
        </div>
    )
}

export default App
