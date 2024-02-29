import { RxCheck, RxCross2 } from 'react-icons/rx'

const Message = ({ message }) => {
  return <div className={`short-message max-w-96 h-12 fixed ${!message.show ? 'hide' : ''} right-2 z-40 border rounded-lg capitalize font-semibold py-2 px-4 text-center flex items-center justify-between gap-x-4 ${!message.show ? '' : message.error ? 'border-red-500 bg-red-200' : 'border-green-500 bg-green-200'}`}>
    <span className={`rounded-full p-1 ${message.error ? 'bg-red-400' : 'bg-green-400'}`}>
      {message.error
        ? <RxCross2 className='w-5 h-5 text-white'/>
        : <RxCheck className='w-5 h-5 text-white'/>
      }
    </span>
    <p>{message?.text}</p>
  </div>
}

export default Message
