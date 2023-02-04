import PropTypes from 'prop-types'
import { getFormattedDateString } from '../utils'

const ThreadInfo = ({ category, name, createdAt }) => {
    return (
        <div className='thread-info'>
            <h3 className='thread-owner'>{name}</h3>
            <p className='thread-created'>{getFormattedDateString(createdAt)}</p>
            <p className='thread-category'>#{category}</p>
        </div>
    )
}

ThreadInfo.propTypes = {
    category: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string
}

export default ThreadInfo
