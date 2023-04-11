import { useState, useEffect, useContext } from 'react'
import WeatherStatusCodeDay from './WeatherStatusCodeDay'
import WeatherStatusCodeNight from './WeatherStatusCodeNight'
import { getCurrentWeather } from '../api/weatherbit'
import { WeatherContext } from '../contexts/WeatherContext'
export default function FavItem ({ favList, lat, lon, cityName }) {
  const [favItemWeatherData, setFavItemWeatherData] = useState(null)
  const { fetchWeatherData, isFavShown, setIsFavShown } =
    useContext(WeatherContext)
  const fetchFavItemWeatherData = async () => {
    try {
      const currentWeather = await getCurrentWeather(lat, lon)
      setFavItemWeatherData(currentWeather)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchFavItemWeatherData()
  }, [favList])
  return (
    <div className='flex justify-between items-center gap-9 mr-12 cursor-pointer'>
      <p
        className='w-28 text-left'
        onClick={() => {
          fetchWeatherData(lat, lon)
          setIsFavShown(!isFavShown)
        }}
      >
        {cityName}
      </p>
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
