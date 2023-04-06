import { useState } from 'react'
import { IconContext } from 'react-icons'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
export default function FavButton ({ lat, lon, isFavorite, onToggleFavorite }) {
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseEnter () {
    setIsHovered(true)
  }

  function handleMouseLeave () {
    setIsHovered(false)
  }

  function handleClick () {
    onToggleFavorite(lat, lon)
  }

  return (
    <>
      <IconContext.Provider value={{ className: 'text-gray-800 text-6xl' }}>
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isFavorite || isHovered ? (
            <MdOutlineFavorite />
          ) : (
            <MdOutlineFavoriteBorder />
          )}
        </button>
      </IconContext.Provider>
    </>
  )
}
