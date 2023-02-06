import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import LeaderboardPage from './pages/LeaderboardPage'
import RegisterPage from './pages/RegisterPage'
import DetailPage from './pages/DetailPage'
import NotFoundPage from './pages/NotFoundPage'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'

const App = () => {
    const { authUser = null, isPreload = false } = useSelector((states) => states)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncPreloadProcess())
    }, [dispatch])

    const onSignOut = () => {
        dispatch(asyncUnsetAuthUser())
    }

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
            <header>
                <Navigation signOut={onSignOut} />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/threads/:id" element={<DetailPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Loading />
        </div>
    )
}

export default App
