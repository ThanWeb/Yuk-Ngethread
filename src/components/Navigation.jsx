import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navigation = ({ signOut }) => {
    return (
        <nav className='main-nav'>
            <Link to='/' className='nav-item'>Home</Link>
            <Link to='/leaderboard' className='nav-item'>Leaderboard</Link>
            <button type='button' className='nav-item' onClick={signOut}>Sign Out</button>
        </nav>
    )
}

Navigation.propTypes = {
    signOut: PropTypes.func
}

export default Navigation
