const Message = ({ isLoading }) => {
  return <div className={`w-screen h-screen fixed left-0 top-0 bg-white bg-opacity-90 z-40 ${isLoading ? 'flex' : 'hidden'}`}>
    <div className='m-auto flex flex-col items-center relative gap-y-2'>
      <div className='flex items-center gap-x-2 p-4'>
        <img
          src='/favicon.png'
          title='Yuk Ngethread'
          alt='Yuk Ngethread'
          className='w-12 h-fit drop-shadow-2xl'
        />
        <p className='text-2xl pt-sans-bold drop-shadow-2xl'>Yuk Nge-Thread</p>
      </div>
      <div className='line-animation'/>
    </div>
  </div>
}

export default Message
