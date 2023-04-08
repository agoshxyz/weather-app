import { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherStatusCodeDay from './WeatherStatusCodeDay'
import WeatherStatusCodeNight from './WeatherStatusCodeNight'
export default function FavItem ({ favList, lat, lon, cityName }) {
  const [favItemWeatherData, setFavItemWeatherData] = useState(null)
  useEffect(() => {
    axios
      .get('/current/', {
        params: {
          lat: lat,
          lon: lon,
          key: import.meta.env.VITE_WEATHERBIT_API_KEY
        }
      })
      .then(response => {
        setFavItemWeatherData(response.data.data)
      })
  }, [favList])
  return (
    <div className='flex justify-between items-center gap-9 mr-12'>
      <p className='w-24'>{cityName}</p>
      {favItemWeatherData && (
        <div className='flex gap-1 items-center'>
          <p>{Math.round(favItemWeatherData[0].temp)}°C</p>
          {favItemWeatherData[0].pod === 'd' ? (
            <WeatherStatusCodeDay
              className='w-12 h-12'
              title={favItemWeatherData[0].weather.description}
              statusCode={favItemWeatherData[0].weather.code}
            />
          ) : (
            <WeatherStatusCodeNight
              className='w-12 h-12'
              title={favItemWeatherData[0].weather.description}
              statusCode={favItemWeatherData[0].weather.code}
            />
          )}
        </div>
      )}
    </div>
  )
}
