
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import ThreadPreview from '../components/ThreadPreview'

const HomePage = () => {
    const { threads = [], users = [], authUser } = useSelector((states) => states)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncPopulateUsersAndThreads())
    }, [dispatch])

    return (
        <div className='home-page'>
            {
                threads.map((thread, index) =>
                    <ThreadPreview key={index} thread={thread} users={users} authUser={authUser} />
                )
            }
        </div>
    )
}

export default HomePage
