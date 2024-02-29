import PropTypes from 'prop-types'

const ThreadInfo = ({ category, name }) => {
  return (
    <div>
      <h3 className='capitalize'>{name}</h3>
      <p className='text-sm text-gray-500 italic'>#{category}</p>
    </div>
  )
}

ThreadInfo.propTypes = {
  category: PropTypes.string,
  name: PropTypes.string
}

export default ThreadInfo
