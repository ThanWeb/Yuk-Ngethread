import PropTypes from 'prop-types'
import TextInput from './TextInput'
import UserAvatar from './UserAvatar'

const CreateThreadModal = ({ props }) => {
  return (
    <div className={`${props.showCreateThreadModal ? 'fixed z-30' : 'hidden'} w-screen h-screen top-0 left-0`}>
      <div className='w-full h-full relative top-0 left-0 flex'>
        <div
          className='absolute z-20 bg-slate-300 opacity-70 w-screen h-screen top-0 left-0'
          onClick={() => {
            props.setShowCreateThreadModal(false)
          }}
        />
        <div className='z-30 bg-white w-4/5 lg:w-3/5 h-fit max-h-thread-modal m-auto shadow-xl p-6 overflow-y-auto flex flex-col gap-y-6'>
          <div className='flex gap-x-3 items-center'>
            <UserAvatar
              avatar={props.authUser.avatar}
              name={props.authUser.name}
            />
            <span className='font-semibold'>{props.authUser.name}</span>
          </div>
          <div>
            <h3>What is going on inside your head?</h3>
          </div>
          <div className='flex'>
            <form className='flex flex-col gap-y-2 min-h-full w-full' onSubmit={(event) => { props.onCreateThread(event) }}>
              <TextInput
                props={{
                  value: props.title,
                  type: 'text',
                  id: 'title',
                  placeholder: 'Title please',
                  label: 'Title',
                  isEmailValid: true,
                  setValue: props.setTitle
                }}
              />
              <div className='flex flex-col gap-y-1'>
                <label htmlFor='body' className='pl-2'>Content</label>
                <textarea
                  id='body'
                  type='text'
                  value={props.body}
                  onChange={props.setBody}
                  placeholder='Write content here'
                  className='border rounded-xl py-2 px-3 bg-white min-h-16'
                  required
                />
              </div>
              <TextInput
                props={{
                  value: props.category,
                  type: 'text',
                  id: 'category',
                  placeholder: '#category',
                  label: 'Category (Optional)',
                  setValue: props.setCategory,
                  isEmailValid: true,
                  isRequired: false
                }}
              />
              <div className='flex justify-end'>
                <button
                  type='submit'
                  disabled={!props.title || !props.body}
                  className={`w-fit ${!props.title || !props.body ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-xl px-6 py-2 font-bold mt-6`}
                >
                  <span>Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

CreateThreadModal.propTypes = {
  props: PropTypes.shape({
    authUser: PropTypes.object,
    showCreateThreadModal: PropTypes.bool,
    setShowCreateThreadModal: PropTypes.func,
    title: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    setTitle: PropTypes.func,
    setBody: PropTypes.func,
    setCategory: PropTypes.func,
    onCreateThread: PropTypes.func
  })
}

export default CreateThreadModal
