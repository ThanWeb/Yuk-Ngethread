import PropTypes from 'prop-types'

const UserAvatar = ({ avatar, name }) => {
  return (
    <div>
      <img
        src={avatar}
        alt={name}
        title={name}
        className='rounded-full overflow-hidden w-10 h-10'
      />
    </div>
  )
}

UserAvatar.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string
}

export default UserAvatar
