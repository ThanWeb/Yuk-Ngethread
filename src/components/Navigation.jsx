import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TbLogout } from 'react-icons/tb'

const Navigation = ({ signOut }) => {
    return (
        <nav className='main-nav'>
            <Link to='/' className='nav-item'>Home</Link>
            <Link to='/leaderboard' className='nav-item'>Leaderboard</Link>
            <button type='button' className='nav-item' onClick={signOut}>
                <span>Sign Out</span>
                <TbLogout className='icons' />
            </button>
        </nav>
    )
}

Navigation.propTypes = {
    signOut: PropTypes.func
}

export default Navigation
