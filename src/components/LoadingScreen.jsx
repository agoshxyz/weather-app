export default function LoadingScreen () {
  return (
    <div className='flex gap-2 justify-center h-screen animate-pulse'>
      <div className='flex items-center gap-2 justify-center text-4xl font-semibold text-gray-700'>
        <svg
          className='animate-spin h-12 w-12 text-gray-700'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='2'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2'
            strokeWidth='1'
          ></path>
        </svg>
        Loading...
      </div>
    </div>
  )
}
