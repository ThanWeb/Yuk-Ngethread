import PropTypes from 'prop-types'

const ThreadOwner = ({ avatar, name }) => {
    return (
        <div className='thread-owner'>
            <img src={avatar} alt={name} title={name} />
            <span>{name}</span>
        </div>
    )
}

ThreadOwner.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string
}

export default ThreadOwner
