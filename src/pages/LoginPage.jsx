import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { TbUserCheck } from 'react-icons/tb'
import useInput from '../hooks/useInput'
import { checkEmailIsValid } from '../utils'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import { asyncSetAuthUser } from '../states/authUser/action'

const LoginPage = () => {
    const dispatch = useDispatch()
    const [isPasswordShowed, setIsPasswordShowed] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [email, setEmail] = useInput()
    const [password, setPassword] = useInput()

    const onLoginHandler = ({ email, password }) => {
        dispatch(asyncSetAuthUser({ email, password }))
    }

    useEffect(() => {
        setIsEmailValid(checkEmailIsValid(email))
    }, [email])

    return (
        <div className='login-page'>
            <header className='login-header'>
                <h1>Almost there</h1>
            </header>
            <div className='form-container'>
                <form>
                    <TextInput
                        props={{
                            value: email,
                            type: 'email',
                            id: 'email',
                            placeholder: 'yourname@gmail.com',
                            label: 'E-mail Address',
                            setValue: setEmail
                        }}
                    />
                    <PasswordInput
                        props={{
                            password,
                            setPassword,
                            placeholder: 'yourpassword',
                            isShowed: isPasswordShowed,
                            setShowed: setIsPasswordShowed
                        }}
                    />
                    <div>
                        <button type='button' onClick={() => onLoginHandler({ email, password })} disabled={!isEmailValid || password.length < 6}>
                            <span>Sign in</span>
                            <TbUserCheck className='icons' />
                        </button>
                    </div>
                </form>
            </div>
            <p>Doesn&apos;t have an account? Please <Link to='/register'>Sign Up</Link></p>
        </div>
    )
}

export default LoginPage
