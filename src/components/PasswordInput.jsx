import PropTypes from 'prop-types'

const PasswordInput = ({ props }) => {
    return (
        <div className='input-field password-field'>
            <label htmlFor='password'>Kata Sandi</label>
            <input id='password' type={props.isShowed ? 'text' : 'password'} value={props.password} onChange={props.setPassword} placeholder={props.placeholder} required/>
            {
                props.isShowed
                    ? <img src='icons/open-eye.png' onClick={() => props.setShowed(false)} className='icons' alt='Sembunyikan' title='Sembunyikan'/>
                    : <img src='icons/shut-eye.png' onClick={() => props.setShowed(true)} className='icons' alt='Tampilkan' title='Tampilkan'/>
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
