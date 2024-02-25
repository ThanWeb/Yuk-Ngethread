import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { HiOutlineHome, HiOutlineUser, HiMiniArrowRightOnRectangle, HiOutlinePlus, HiOutlineChartBar } from 'react-icons/hi2'

const Navigation = ({ signOut }) => {
  return (
    <div className='fixed bottom-0 left-0 w-screen bg-white flex justify-center'>
      <nav className='w-full md:w-fit grid grid-cols-5 py-2 px-3 gap-x-2 md:gap-x-6 md:py-3'>
        <Link
          to='/' className='flex flex-col gap-y-1 justify-center items-center'
        >
          <HiOutlineHome className='w-7 h-7 text-gray-500'/>
          <span className='text-sm'>Home</span>
        </Link>
        <Link
          to='/leaderboard'
          className='flex flex-col gap-y-1 justify-center items-center'
        >
          <HiOutlineChartBar className='w-7 h-7 text-gray-500'/>
          <span className='text-sm'>Lead</span>
        </Link>
        <div className='relative mx-auto w-12 h-12'>
          <div className='absolute -top-6 -left-2 flex bg-white p-2 rounded-full'>
            <button className='flex justify-center items-center bg-teal-600 rounded-full w-12 h-12'>
              <HiOutlinePlus className='text-white w-7 h-7'/>
            </button>
          </div>
        </div>
        <Link
          to='/profile'
          className='flex flex-col gap-y-1 justify-center items-center'
        >
          <HiOutlineUser className='w-7 h-7 text-gray-500'/>
          <span className='text-sm'>Profile</span>
        </Link>
        <button
          type='button'
          onClick={signOut}
          className='flex flex-col gap-y-1 justify-center items-center'
        >
          <HiMiniArrowRightOnRectangle className='w-7 h-7 text-gray-500'/>
          <span className='text-sm'>Sign Out</span>
        </button>
      </nav>
    </div>
  )
}

Navigation.propTypes = {
  signOut: PropTypes.func
}

export default Navigation
