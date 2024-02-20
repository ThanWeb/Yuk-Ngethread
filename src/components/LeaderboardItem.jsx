import PropTypes from 'prop-types'

const LeaderboardItem = ({ position, user, score }) => {
  return (
    <div>
      <img
        src={user.avatar}
        alt={user.name}
        title={user.name}
      />
      <p>{user.name}</p>
      <p>{score}</p>
    </div>
  )
}

LeaderboardItem.propTypes = {
  position: PropTypes.number,
  user: PropTypes.object,
  score: PropTypes.number
}

export default LeaderboardItem
