import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className='main-nav'>
            <Link to='/' className='nav-item'>Home</Link>
            <Link to='/leaderboard' className='nav-item'>Leaderboard</Link>
            <button type='button' className='nav-item'>Sign Out</button>
        </nav>
    )
}

export default Navigation
