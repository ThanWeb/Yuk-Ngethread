import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

const ThreadContent = ({ title, body, id }) => {
  return (
    <div>
      <h3>
        {
          id
            ? <Link to={`/threads/${id}`}>{title}</Link>
            : `${title}`
        }
      </h3>
      <div>{parse(body)}</div>
    </div>
  )
}

ThreadContent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string
}

export default ThreadContent
