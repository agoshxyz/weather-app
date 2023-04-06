import { useState } from 'react'
import { IconContext } from 'react-icons'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
export default function FavButton ({ lat, lon, isFavorite, onToggleFavorite }) {

  function handleClick () {
    onToggleFavorite(lat, lon)
  }

  return (
    <>
      <IconContext.Provider value={{ className: 'text-gray-800 text-6xl' }}>
        <button
          onClick={handleClick}
        >
          {isFavorite ? (
            <MdOutlineFavorite />
          ) : (
            <MdOutlineFavoriteBorder />
          )}
        </button>
      </IconContext.Provider>
    </>
  )
}
