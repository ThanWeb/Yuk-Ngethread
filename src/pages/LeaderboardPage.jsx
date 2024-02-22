import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveLeaderboards } from '../states/leaderboard/action'
import LeaderboardItem from '../components/LeaderboardItem'
import PreloadLoading from '../components/PreloadLoading'

const LeaderboardPage = () => {
  const { leaderboards = [] } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards())
  }, [dispatch])

  if (leaderboards.length === 0) {
    return <PreloadLoading />
  }

  return (
    <div>
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
