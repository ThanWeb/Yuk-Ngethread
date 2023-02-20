import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { TbUserPlus } from 'react-icons/tb'
import useInput from '../hooks/useInput'
import { checkEmailIsValid } from '../utils'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import { asyncRegisterUser } from '../states/users/action'

const RegisterPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPasswordShowed, setIsPasswordShowed] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [email, setEmail] = useInput()
    const [name, setName] = useInput()
    const [password, setPassword] = useInput()

    const onRegisterHandler = ({ name, email, password }) => {
        dispatch(asyncRegisterUser({ name, email, password }))
        navigate('/')
    }

    useEffect(() => {
        setIsEmailValid(checkEmailIsValid(email))
    }, [email])

    return (
        <div className='register-page'>
            <div className='container'>
                <header className='register-header'>
                    <h1>Let&apos;s get started!</h1>
                </header>
                <div className='form-container'>
                    <form>
                        <TextInput
                            props={{
                                value: name,
                                type: 'text',
                                id: 'name',
                                placeholder: 'Your Name',
                                label: 'Name',
                                setValue: setName
                            }}
                        />
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
                            <button type='button' className='register-button' onClick={() => onRegisterHandler({ name, email, password })} disabled={!name || !isEmailValid || password.length < 6}>
                                <span>Sign up</span>
                                <TbUserPlus className='icons'/>
                            </button>
                        </div>
                    </form>
                </div>
                <p><Link to='/'>Sign In</Link> if already have an account</p>
            </div>
        </div>
    )
}

export default RegisterPage
