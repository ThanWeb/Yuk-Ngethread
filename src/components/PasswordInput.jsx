import PropTypes from 'prop-types'
import { TbEyeOff, TbEye } from 'react-icons/tb'

const PasswordInput = ({ props }) => {
  return (
    <div className='flex flex-col gap-y-1'>
      <label
        htmlFor='password'
        className='pl-2'
      >
        Password
      </label>
      <div className={`flex items-center relative border rounded-xl py-2 pl-3 pr-12 bg-white ${props.password.length < 6 && props.password !== '' ? 'border-red-600' : ''}`}>
        <input
          id='password'
          type={props.isShowed ? 'text' : 'password'}
          value={props.password}
          onChange={props.setPassword}
          placeholder={props.placeholder}
          className='w-full h-full'
          required
        />
        <button type='button' className='absolute right-3'>
          {
            props.isShowed
              ? <TbEye
                onClick={() => props.setShowed(false)}
                title='Show'
                className='w-5 h-5'
              />
              : <TbEyeOff
                onClick={() => props.setShowed(true)}
                title='Hide'
                className='w-5 h-5'
              />
          }
        </button>
      </div>
    </div>
  )
}

PasswordInput.propTypes = {
  props: PropTypes.shape({
    password: PropTypes.string,
    placeholder: PropTypes.string,
    isShowed: PropTypes.bool,
    setShowed: PropTypes.func,
    setPassword: PropTypes.func
  })
}

export default PasswordInput
