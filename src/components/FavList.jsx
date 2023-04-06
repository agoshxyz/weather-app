import { useContext } from 'react'
import { WeatherContext } from '../contexts/WeatherContext'
export default function FavList () {
  const { favList, setFavList } = useContext(WeatherContext)
  return (
    <>
      <div className='text-center mt-20 text-4xl font-bold'>
        <h2>My favorites</h2>
      </div>
      <div className='flex justify-center items-center w-full h-96'>
        <div className='flex justify-center w-5/6 md:w-3/6 h-5/6 rounded-lg border'>
          {favList.length > 0 ? (
            <div className='flex flex-col gap-4'>
              {favList.map((favorite, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center gap-10'
                >
                  <p>{favorite.cityName}</p>
                  <button
                    onClick={() =>
                      setFavList(favList.filter((fav, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className='inline-flex items-center'>No favorites yet</p>
          )}
        </div>
      </div>
    </>
  )
}
