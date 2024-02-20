import PropTypes from 'prop-types'
import { TbEyeOff, TbEye } from 'react-icons/tb'

const PasswordInput = ({ props }) => {
  return (
    <div>
      <label htmlFor='password'>Password</label>
      <div>
        <input
          id='password'
          type={props.isShowed ? 'text' : 'password'}
          value={props.password}
          onChange={props.setPassword}
          placeholder={props.placeholder}
          required
        />
        <button type='button'>
          {
            props.isShowed
              ? <TbEye
                onClick={() => props.setShowed(false)}
                title='Show'
              />
              : <TbEyeOff
                onClick={() => props.setShowed(true)}
                title='Hide'
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
