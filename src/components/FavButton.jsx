import { IconContext } from 'react-icons'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import { isMobile } from 'react-device-detect'
export default function FavButton ({
  lat,
  lon,
  cityName,
  isFavorite,
  onToggleFavorite
}) {
  function handleClick () {
    onToggleFavorite(lat, lon, cityName)
  }
  return (
    <>
      <IconContext.Provider
        value={{
          className: `text-gray-800 text-4xl ${isMobile ? 'mt-0' : 'mt-2'}`
        }}
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
