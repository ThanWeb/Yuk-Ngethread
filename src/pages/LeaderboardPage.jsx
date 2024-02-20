import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveLeaderboards } from '../states/leaderboard/action'
import LeaderboardItem from '../components/LeaderboardItem'

const LeaderboardPage = () => {
  const { leaderboards = [] } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards())
  }, [dispatch])

  return (
    <div id='leaderboard-page'>
      <h2>Leaderboard</h2>
      <div>
        {
          leaderboards.map((leaderboard, index, positon) =>
            <LeaderboardItem
              key={index}
              position={index}
              user={leaderboard.user}
              score={leaderboard.score}
            />
          )
        }
      </div>
    </div>
  )
}

export default LeaderboardPage
