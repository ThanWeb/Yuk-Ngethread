import { RxCheck, RxCross2 } from 'react-icons/rx'

const Message = ({ message }) => {
  return <div className={`short-message min-w-64 max-w-80 h-12 fixed ${message === null ? 'hide' : ''} right-2 z-40 border rounded-lg capitalize font-semibold py-2 px-3 text-center flex items-center justify-center gap-x-2 ${message?.error === undefined ? '' : message.error ? 'border-red-500 bg-red-200' : 'border-green-500 bg-green-200'}`}>
    <span>
      {
        message?.error === undefined
          ? null
          : message.error
            ? <RxCross2 className='w-6 h-6 text-red-700'/>
            : <RxCheck className='w-6 h-6 text-green-700'/>
      }
    </span>
    <p>{message?.text}</p>
  </div>
}

export default Message
