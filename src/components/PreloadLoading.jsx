const PreloadLoading = () => {
  return <div className='w-screen h-screen fixed top-0 left-0 bg-white z-50 flex'>
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

export default PreloadLoading
