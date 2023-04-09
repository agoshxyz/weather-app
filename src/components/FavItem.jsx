import { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherStatusCodeDay from './WeatherStatusCodeDay'
import WeatherStatusCodeNight from './WeatherStatusCodeNight'
import { getCurrentWeather } from '../api/weatherbit'
export default function FavItem ({ favList, lat, lon, cityName }) {
  const [favItemWeatherData, setFavItemWeatherData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentWeather = await getCurrentWeather(lat, lon)
        setFavItemWeatherData(currentWeather)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
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
