import PropTypes from 'prop-types'
import { TbEyeOff, TbEye } from 'react-icons/tb'

const PasswordInput = ({ props }) => {
    return (
        <div className='input-field password-field'>
            <label htmlFor='password'>Password</label>
            <input id='password' type={props.isShowed ? 'text' : 'password'} value={props.password} onChange={props.setPassword} placeholder={props.placeholder} required/>
            {
                props.isShowed
                    ? <TbEye onClick={() => props.setShowed(false)} className='icons' title='Show'/>
                    : <TbEyeOff onClick={() => props.setShowed(true)} className='icons' title='Hide'/>
            }
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
