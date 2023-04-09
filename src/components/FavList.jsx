import { useContext } from 'react'
import { IconContext } from 'react-icons'
import { TiDelete } from 'react-icons/ti'
import { WeatherContext } from '../contexts/WeatherContext'
import FavItem from './FavItem'
export default function FavList () {
  const { favList, setFavList } = useContext(WeatherContext)
  return (
    <>
      <div className='w-full h-96'>
        <div className='text-center mt-12 text-4xl font-bold mb-6'>
          <h2>My favorite cities</h2>
        </div>
        <div className='flex justify-center overflow-auto h-56 '>
          <div className='flex justify-center rounded-lg '>
            {favList.length > 0 ? (
              <div className='flex flex-col gap-4 w-80'>
                {favList.map((favorite, index) => (
                  <div className='flex justify-between' key={index}>
                    <FavItem
                      favList={favList}
                      lat={favorite.lat}
                      lon={favorite.lon}
                      cityName={favorite.cityName}
                    />
                    <IconContext.Provider
                      value={{ className: 'text-2xl cursor-pointer' }}
                    >
                      <button
                        onClick={() =>
                          setFavList(favList.filter((fav, i) => i !== index))
                        }
                      >
                        <TiDelete />
                      </button>
                    </IconContext.Provider>
                  </div>
                ))}
              </div>
            ) : (
              <p className='inline-flex items-center font-medium'>
                No favorites yet
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
