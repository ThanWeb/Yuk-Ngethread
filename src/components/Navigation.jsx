import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TbLogout, TbStars, TbStack2 } from 'react-icons/tb'

const Navigation = ({ signOut }) => {
  return (
    <nav>
      <Link to='/'>
        <span>Home</span>
        <TbStack2/>
      </Link>
      <Link to='/leaderboard'>
        <span>Leaderboard</span>
        <TbStars/>
      </Link>
      <button
        type='button'
        onClick={signOut}
      >
        <span>Sign Out</span>
        <TbLogout/>
      </button>
    </nav>
  )
}

Navigation.propTypes = {
  signOut: PropTypes.func
}

export default Navigation
