import { useState, createContext } from 'react'
import {
  getCurrentWeather,
  getHourlyForecast,
  getWeeklyForecast
} from '../api/weatherbit'
const savedFavorites = localStorage.getItem('favorites')
  ? JSON.parse(localStorage.getItem('favorites'))
  : []

export const WeatherContext = createContext({})

export function WeatherContextProvider ({ children }) {
  const [favList, setFavList] = useState(savedFavorites)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isGeoLocation, setIsGeoLocation] = useState(false)
  const [currentLatitude, setCurrentLatitude] = useState(null)
  const [currentLongitude, setCurrentLongitude] = useState(null)
  const [currentWeatherData, setCurrentWeatherData] = useState(null)
  const [hourlyForecastData, setHourlyForecastData] = useState(null)
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null)
  const [isFavShown, setIsFavShown] = useState(false)

  const fetchWeatherData = async (lat, lon) => {
    setCurrentLatitude(lat)
    setCurrentLongitude(lon)
    try {
      const currentWeather = await getCurrentWeather(lat, lon)
      const hourlyForecast = await getHourlyForecast(lat, lon)
      const weeklyForecast = await getWeeklyForecast(lat, lon)
      setCurrentWeatherData(currentWeather)
      setHourlyForecastData(hourlyForecast)
      setWeeklyWeatherData(weeklyForecast)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
      console.error(error)
    }
  }
  return (
    <WeatherContext.Provider
      value={{
        favList,
        setFavList,
        isLoading,
        isError,
        isGeoLocation,
        setIsGeoLocation,
        currentLatitude,
        setCurrentLatitude,
        currentLongitude,
        setCurrentLongitude,
        currentWeatherData,
        hourlyForecastData,
        weeklyWeatherData,
        fetchWeatherData,
        isFavShown,
        setIsFavShown
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
