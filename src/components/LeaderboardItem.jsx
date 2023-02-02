import PropTypes from 'prop-types'

const LeaderboardItem = ({ position, user, score }) => {
    return (
        <div className={`leaderboard-item${position < 3 && ` positon-${position + 1}`}`}>
            <img src={user.avatar} alt={user.name} title={user.name} className='avatar-image'/>
            <p className='username'>{user.name}</p>
            <p className='score'>{score}</p>
        </div>
    )
}

LeaderboardItem.propTypes = {
    position: PropTypes.number,
    user: PropTypes.object,
    score: PropTypes.number
}

export default LeaderboardItem
