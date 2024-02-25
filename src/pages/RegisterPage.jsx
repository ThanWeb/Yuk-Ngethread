import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'
import { checkEmailIsValid } from '../utils'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import { asyncRegisterUser } from '../states/users/action'
import { setMessageActionCreator } from '../states/message/action'
import { setLoadingFalseActionCreator, setLoadingTrueActionCreator } from '../states/isLoading/action'

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isPasswordShowed, setIsPasswordShowed] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [email, setEmail] = useInput()
  const [name, setName] = useInput()
  const [password, setPassword] = useInput()

  const onRegisterHandler = async ({ name, email, password }) => {
    dispatch(setLoadingTrueActionCreator())
    const { status = 'fail', message = '', data = null } = await dispatch(asyncRegisterUser({ name, email, password }))

    if (status !== 'fail') {
      dispatch(setMessageActionCreator({ show: true, error: false, text: `One more step for ${data.user.name}` }))
      navigate('/')
    } else {
      dispatch(setMessageActionCreator({ show: true, error: true, text: message }))
    }

    dispatch(setLoadingFalseActionCreator())
  }

  useEffect(() => {
    setIsEmailValid(checkEmailIsValid(email))
  }, [email])

  return (
    <div className='min-w-screen min-h-screen flex auth-page'>
      <div className='m-auto flex flex-col gap-y-6 items-center justify-between bg-white bg-opacity-80 border w-4/5 md:w-6/12 lg:w-4/12 xl:w-3/12 p-6 rounded-3xl shadow-sm shadow-emerald-600'>
        <header className='flex flex-col gap-y-3 items-center text-center'>
          <img src='/favicon.png' alt='Yuk Ngethread' className='h-16 w-16'/>
          <h1 className='text-xl font-semibold'>Let&apos;s get started!</h1>
        </header>
        <div className='w-full'>
          <form className='flex flex-col gap-y-2'>
            <TextInput
              props={{
                value: name,
                type: 'text',
                id: 'name',
                placeholder: 'Username',
                label: 'Username',
                setValue: setName,
                isEmailValid: true
              }}
            />
            <TextInput
              props={{
                value: email,
                type: 'email',
                id: 'email',
                placeholder: 'name@gmail.com',
                label: 'E-mail Address',
                setValue: setEmail,
                isEmailValid
              }}
            />
            <PasswordInput
              props={{
                password,
                setPassword,
                placeholder: '',
                isShowed: isPasswordShowed,
                setShowed: setIsPasswordShowed
              }}
            />
            <div>
              <button
                type='button'
                onClick={() => onRegisterHandler({ name, email, password })}
                disabled={!name || !isEmailValid || password.length < 6}
                className='w-full bg-emerald-500 text-white rounded-xl mt-3 py-2 font-bold'
              >
                <span>Sign up</span>
              </button>
            </div>
          </form>
        </div>
        <p className='text-center'>Already have an account? <Link to='/' className='font-semibold underline underline-offset-2'>Sign In</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage
