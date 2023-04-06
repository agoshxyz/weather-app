export default function Modal ({ isOpen, onClose, children }) {
  const handleClose = e => {
    if (e.target.id === 'wrapper') {
      onClose()
    }
  }
  if (!isOpen) return null
  return (
    <div
      className='z-10 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center '
      id='wrapper'
      onClick={handleClose}
    >
      <div className={`w-full max-w-4xl m-10 lg:m-3 overflow-y-auto`}>
        <div className='bg-white rounded-lg flex flex-col overflow-hidden relative'>
          <div
            className='absolute top-0 right-0 p-2'
            onClick={() => {
              onClose()
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}