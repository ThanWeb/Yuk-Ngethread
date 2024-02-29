import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NotFoundPage = () => {
  const { authUser = null } = useSelector((states) => states)

  return (
    <div className={`${authUser === null ? 'pb-10' : 'pb-20'} flex bg-slate-100 w-screen h-screen fixed top-0 left-0`}>
      <div className='m-auto flex flex-col md:flex-row md:items-center gap-y-2 gap-x-4 px-6'>
        <img src='/favicon.png' alt='Yuk Ngethread' className='h-12 w-12'/>
        <div className='flex flex-col gap-y-2'>
          <p className='text-2xl font-bold'>Sorry,<br/>this page can&apos;t be found.</p>
          <p>
            {
              authUser === null
                ? <span>May you want to <Link to={'/'} className='text-blue-800 font-medium'>Sign In</Link>?</span>
                : <span>Back to <Link to={'/'} className='text-blue-800 font-medium'>Home</Link></span>
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
