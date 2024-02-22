import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <p>
        <span>404</span><span>|</span><span>Not Found</span>
      </p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )
}

export default NotFoundPage
