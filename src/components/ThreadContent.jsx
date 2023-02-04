import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

const ThreadContent = ({ title, body, id }) => {
    return (
        <div className='content-section'>
            <h3 className='owner-info'><Link to={`/threads/${id}`}>{title}</Link></h3>
            <div className='thread-body'>{parse(body)}</div>
        </div>
    )
}

ThreadContent.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string
}

export default ThreadContent
