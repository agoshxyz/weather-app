import { IconContext } from 'react-icons'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
export default function FavButton ({ lat, lon, isFavorite, onToggleFavorite }) {
  function handleClick () {
    onToggleFavorite(lat, lon)
  }
  return (
    <>
      <IconContext.Provider
        value={{ className: 'text-gray-800 text-4xl mt-3' }}
      >
        <button
          onClick={handleClick}
          title={`${isFavorite ? 'Remove from favorites' : 'Add to favorites'}`}
        >
          {isFavorite ? <IoIosStar /> : <IoIosStarOutline />}
        </button>
      </IconContext.Provider>
    </>
  )
}
