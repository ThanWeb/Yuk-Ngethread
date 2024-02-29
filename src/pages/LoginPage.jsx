import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'
import { checkEmailIsValid } from '../utils'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import { asyncSetAuthUser } from '../states/authUser/action'
import { setLoadingFalseActionCreator, setLoadingTrueActionCreator } from '../states/isLoading/action'

const LoginPage = () => {
  const dispatch = useDispatch()
  const { message = [] } = useSelector((states) => states)

  const [isPasswordShowed, setIsPasswordShowed] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [email, setEmail] = useInput()
  const [password, setPassword] = useInput()

  const onLoginHandler = async (event, { email, password }) => {
    event.preventDefault()
    dispatch(setLoadingTrueActionCreator())
    await dispatch(asyncSetAuthUser({ email, password }))
    dispatch(setLoadingFalseActionCreator())
  }

  useEffect(() => {
    setIsEmailValid(checkEmailIsValid(email) !== null)
  }, [email])

  return (
    <div className='min-w-screen min-h-screen flex auth-page'>
      <div className='m-auto flex flex-col gap-y-6 items-center justify-between bg-white bg-opacity-80 border w-4/5 md:w-6/12 lg:w-4/12 xl:w-3/12 p-6 rounded-3xl shadow-sm shadow-emerald-600'>
        <header className='flex flex-col gap-y-3 items-center text-center'>
          <img src='/favicon.png' alt='Yuk Ngethread' className='h-16 w-16'/>
          <h1 className='text-xl font-semibold'>Almost there!</h1>
        </header>
        <div className='w-full'>
          <form className='flex flex-col gap-y-2' onSubmit={(event) => onLoginHandler(event, { email, password })}>
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
                type='submit'
                disabled={!isEmailValid || password.length < 6 || message.show}
                className='w-full bg-emerald-500 text-white rounded-xl mt-3 py-2 font-bold'
              >
                <span>Sign in</span>
              </button>
            </div>
          </form>
        </div>
        <p className='text-center'>Don&apos;t have an account? <Link to='/register' className='font-semibold underline underline-offset-2'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default LoginPage
