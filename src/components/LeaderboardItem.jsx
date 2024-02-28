import PropTypes from 'prop-types'

const LeaderboardItem = ({ position, user, score }) => {
  return (
    <div className='rounded-xl shadow-md overflow-hidden flex bg-white justify-start'>
      <div className='flex items-center min-w-16'>
        <p className='px-4 w-full text-2xl text-center'>{position + 3}</p>
      </div>
      <div className='flex justify-start items-center gap-x-4 w-full'>
        <img
          src={user.avatar}
          alt={user.name}
          title={user.name}
        />
        <p className='capitalize text-xl line-clamp-1 text-ellipsis'>{user.name}</p>
        <p className='ml-auto text-2xl pr-6'>{score}</p>
      </div>
    </div>
  )
}

LeaderboardItem.propTypes = {
  position: PropTypes.number,
  user: PropTypes.object,
  score: PropTypes.number
}

export default LeaderboardItem
