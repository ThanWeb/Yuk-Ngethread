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
    <div className='container mx-auto'>
      <div className='px-6 py-6'>
        <div className='flex flex-col gap-y-3'>
          <div className='grid grid-cols-3 gap-x-3 mb-6'>
            <div className='order-2 flex flex-col items-center'>
              <div className='flex flex-col items-center rounded-full relative bg-emerald-500 p-2'>
                <img
                  src={leaderboards[0].user.avatar}
                  alt={leaderboards[0].user.name}
                  title={leaderboards[0].user.name}
                  className='rounded-full'
                />
                <p className='absolute -bottom-3 text-center bg-emerald-500 w-10 h-10 leading-10 text-white rounded-full font-bold text-xl'>1</p>
              </div>
              <p className='capitalize text-lg line-clamp-1 text-ellipsis pt-4 font-semibold text-center'>{leaderboards[0].user.name}</p>
              <p className='text-xl font-semibold'>{leaderboards[0].score}</p>
            </div>
            <div className='order-1 flex flex-col items-center mt-4'>
              <div className='flex flex-col items-center rounded-full relative bg-blue-500 p-2'>
                <img
                  src={leaderboards[1].user.avatar}
                  alt={leaderboards[1].user.name}
                  title={leaderboards[1].user.name}
                  className='rounded-full'
                />
                <p className='absolute -bottom-3 text-center bg-blue-500 w-10 h-10 leading-10 text-white rounded-full font-bold text-xl'>2</p>
              </div>
              <p className='capitalize text-lg line-clamp-1 text-ellipsis pt-4 font-semibold text-center'>{leaderboards[1].user.name}</p>
              <p className='text-xl font-semibold'>{leaderboards[1].score}</p>
            </div>
            <div className='order-3 flex flex-col items-center mt-8'>
              <div className='flex flex-col items-center rounded-full relative bg-rose-500 p-2'>
                <img
                  src={leaderboards[2].user.avatar}
                  alt={leaderboards[2].user.name}
                  title={leaderboards[2].user.name}
                  className='rounded-full'
                />
                <p className='absolute -bottom-3 text-center bg-rose-500 w-10 h-10 leading-10 text-white rounded-full font-bold text-xl'>3</p>
              </div>
              <p className='capitalize text-lg line-clamp-1 text-ellipsis pt-4 font-semibold text-center'>{leaderboards[2].user.name}</p>
              <p className='text-xl font-semibold'>{leaderboards[2].score}</p>
            </div>
          </div>
          {
            leaderboards.slice(3).map((leaderboard, index) =>
              <LeaderboardItem
                key={index}
                position={index + 1}
                user={leaderboard.user}
                score={leaderboard.score}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
