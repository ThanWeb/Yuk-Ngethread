import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { HiOutlineHome, HiOutlineUser, HiMiniArrowRightOnRectangle, HiOutlinePlus, HiOutlineChartBar } from 'react-icons/hi2'

const Navigation = ({ signOut, setShowCreateThreadModal, setShowProfileModal }) => {
  return (
    <div className='fixed lg:static h-20 lg:h-fit bottom-0 left-0 w-screen bg-white flex justify-center lg:w-full border-2 lg:border-0 lg:font-semibold'>
      <nav className='w-full md:w-fit grid grid-cols-5 lg:flex lg:flex-col lg:gap-y-3 py-3 px-3 gap-x-2 md:gap-x-6 lg:w-full lg:p-0'>
        <button className='hidden lg:flex gap-x-5 justify-start items-center bg-teal-600 text-white rounded-full lg:pl-2 xl:pl-6 pr-2 py-2' onClick={() => { setShowCreateThreadModal(true) }}>
          <HiOutlinePlus className='w-7 h-7'/>
          <span className='text-md'>Create</span>
        </button>
        <Link
          to='/' className='flex flex-col gap-y-1 justify-center items-center lg:flex-row lg:gap-x-5 lg:justify-start lg:pl-2 xl:pl-6 lg:pr-2 lg:py-1'
        >
          <HiOutlineHome className='w-7 h-7 text-gray-700'/>
          <span className='text-sm lg:text-md'>Home</span>
        </Link>
        <Link
          to='/leaderboard'
          className='flex flex-col gap-y-1 justify-center items-center lg:flex-row lg:gap-x-5 lg:justify-start lg:pl-2 xl:pl-6 lg:pr-2 lg:py-1'
        >
          <HiOutlineChartBar className='w-7 h-7 text-gray-700'/>
          <span className='text-sm lg:text-md'>Lead</span>
        </Link>
        <div className='relative mx-auto w-12 h-12 lg:hidden'>
          <div className='absolute -top-6 -left-2 flex bg-white p-2 rounded-full border-2'>
            <button className='flex justify-center items-center bg-teal-600 rounded-full w-12 h-12' onClick={() => { setShowCreateThreadModal(true) }}>
              <HiOutlinePlus className='text-white w-7 h-7'/>
            </button>
          </div>
        </div>
        <button
          type='button'
          onClick={() => { setShowProfileModal(true) }}
          className='flex flex-col gap-y-1 justify-center items-center lg:flex-row lg:gap-x-5 lg:justify-start lg:pl-2 xl:pl-6 lg:pr-2 lg:py-1'
        >
          <HiOutlineUser className='w-7 h-7 text-gray-700'/>
          <span className='text-sm lg:text-md'>Profile</span>
        </button>
        <button
          type='button'
          onClick={signOut}
          className='flex flex-col gap-y-1 justify-center items-center lg:flex-row lg:gap-x-5 lg:justify-start lg:pl-2 xl:pl-6 lg:pr-2 lg:py-1'
        >
          <HiMiniArrowRightOnRectangle className='w-7 h-7 text-gray-700'/>
          <span className='text-sm lg:text-md'>Sign Out</span>
        </button>
      </nav>
    </div>
  )
}

Navigation.propTypes = {
  signOut: PropTypes.func,
  setShowCreateThreadModal: PropTypes.func,
  setShowProfileModal: PropTypes.func
}

export default Navigation
