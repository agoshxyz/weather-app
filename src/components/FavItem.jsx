import { useEffect, useState } from 'react'
import WeatherStatusCodeDay from './WeatherStatusCodeDay'
import WeatherStatusCodeNight from './WeatherStatusCodeNight'
import { getCurrentWeather } from '../api/weatherbit'
export default function FavItem ({ favList, lat, lon, cityName }) {
  const [favItemWeatherData, setFavItemWeatherData] = useState(null)
  const fetchWeatherData = async () => {
    try {
      const currentWeather = await getCurrentWeather(lat, lon)
      setFavItemWeatherData(currentWeather)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchWeatherData()
  }, [favList])
  return (
    <div className='flex justify-between items-center gap-9 mr-12'>
      <p className='w-28 text-left'>{cityName}</p>
      {favItemWeatherData && (
        <div className='flex gap-1 items-center'>
          <p>{Math.round(favItemWeatherData.temp)}°C</p>
          {favItemWeatherData.pod === 'd' ? (
            <WeatherStatusCodeDay
              className='w-12 h-12'
              title={favItemWeatherData.weather.description}
              statusCode={favItemWeatherData.weather.code}
            />
          ) : (
            <WeatherStatusCodeNight
              className='w-12 h-12'
              title={favItemWeatherData.weather.description}
              statusCode={favItemWeatherData.weather.code}
            />
          )}
        </div>
      )}
    </div>
  )
}
