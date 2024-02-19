import PropTypes from 'prop-types'

const UserAvatar = ({ avatar, name }) => {
  return (
    <div className='user-avatar'>
      <img src={avatar} alt={name} title={name} />
    </div>
  )
}

UserAvatar.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string
}

export default UserAvatar
