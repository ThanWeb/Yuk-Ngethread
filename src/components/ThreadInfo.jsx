import PropTypes from 'prop-types'
import { getFormattedDateString } from '../utils'

const ThreadInfo = ({ category, name, createdAt }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{getFormattedDateString(createdAt)}</p>
      <p>#{category}</p>
    </div>
  )
}

ThreadInfo.propTypes = {
  category: PropTypes.string,
  name: PropTypes.string,
  createdAt: PropTypes.string
}

export default ThreadInfo
