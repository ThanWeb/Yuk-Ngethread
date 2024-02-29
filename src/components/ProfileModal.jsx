import PropTypes from 'prop-types'
import { RxCross2 } from 'react-icons/rx'

const ProfileModal = ({
  showProfileModal,
  setShowProfileModal,
  authUser
}) => {
  return (
    <div className={`${showProfileModal ? 'fixed z-30' : 'hidden'} w-screen h-screen top-0 left-0`}>
      <div className='w-full h-full relative top-0 left-0 flex'>
        <div
          className='absolute z-20 bg-slate-300 opacity-70 w-screen h-screen top-0 left-0 cursor-pointer'
          onClick={() => { setShowProfileModal(false) }}
        />
        <div className='z-30 bg-white w-4/5 md:w-3/5 xl:w-2/5 2xl:w-1/5 h-fit max-h-thread-modal m-auto rounded-2xl overflow-hidden shadow-xl p-6 overflow-y-auto flex flex-col gap-y-6'>
          <div className='flex justify-between'>
            <h1 className='text-xl'>Profile</h1>
            <button
              className='flex'
              onClick={() => { setShowProfileModal(false) }}
            >
              <RxCross2 className='m-auto w-8 h-8'/>
            </button>
          </div>
          <div className='flex flex-col gap-y-6'>
            <div className='mx-auto'>
              <img
                src={authUser.avatar}
                alt={authUser.name}
                title={authUser.name}
                className='rounded-full overflow-hidden w-16 h-16'
              />
            </div>
            <div className='flex flex-col gap-y-3'>
              <p className='flex flex-col gap-y-2'>
                <span className='font-semibold'>Unique ID</span>
                <span className='border rounded-lg py-1 px-3'>{authUser.id}</span>
              </p>
              <p className='flex flex-col gap-y-2'>
                <span className='font-semibold'>Userame</span>
                <span className='border rounded-lg py-1 px-3'>{authUser.name}</span>
              </p>
              <p className='flex flex-col gap-y-2'>
                <span className='font-semibold'>E-mail Address</span>
                <span className='border rounded-lg py-1 px-3'>{authUser.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProfileModal.propTypes = {
  showProfileModal: PropTypes.bool,
  setShowProfileModal: PropTypes.func,
  authUser: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string
  })
}

export default ProfileModal
