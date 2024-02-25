import PropTypes from 'prop-types'

const UserAvatar = ({ avatar, name }) => {
  return (
    <div className='rounded-full overflow-hidden w-10 h-10'>
      <img
        src={avatar}
        alt={name}
        title={name}
      />
    </div>
  )
}

UserAvatar.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string
}

export default UserAvatar
