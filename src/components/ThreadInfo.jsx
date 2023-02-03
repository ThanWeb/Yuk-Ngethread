import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getFormattedDateString } from '../utils'

const ThreadInfo = ({ category, id, title, createdAt }) => {
    return (
        <div className='thread-info'>
            <p className='thread-category'>#{category}</p>
            <h3 className='owner-info'><Link to={`/threads/${id}`}>{title}</Link></h3>
            <p className='thread-created'>{getFormattedDateString(createdAt)}</p>
        </div>
    )
}

ThreadInfo.propTypes = {
    category: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    createdAt: PropTypes.string
}

export default ThreadInfo
