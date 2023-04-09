import { useState, useEffect, useContext } from 'react'
import { IconContext } from 'react-icons'
import { TbClockHour4 } from 'react-icons/tb'
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md'
import { BsCalendarDay } from 'react-icons/bs'
import { WeatherContext } from './contexts/WeatherContext'
import LoadingScreen from './components/LoadingScreen'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import Modal from './components/Modal'
import FavList from './components/FavList'
import SearchInput from './components/SearchInput'
import {
  getCurrentWeather,
  getHourlyForecast,
  getWeeklyForecast
} from './api/weatherbit'

function App () {
  const [isLoading, setIsLoading] = useState(false)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [isFavShown, setIsFavShown] = useState(false)
  const [currentLatitude, setCurrentLatitude] = useState(null)
  const [currentLongitude, setCurrentLongitude] = useState(null)
  const [currentWeatherData, setCurrentWeatherData] = useState(null)
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null)
  const [hourlyForecastData, setHourlyForecastData] = useState(null)
  const [selectedOption, setSelectedOption] = useState('hourly')
  const { favList, setFavList } = useContext(WeatherContext)
  const handlePlaceChanged = (lat, lng) => {
    setCurrentLatitude(lat)
    setCurrentLongitude(lng)
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const currentWeather = await getCurrentWeather(
          currentLatitude,
          currentLongitude
        )
        const hourlyForecast = await getHourlyForecast(
          currentLatitude,
          currentLongitude
        )
        const weeklyForecast = await getWeeklyForecast(
          currentLatitude,
          currentLongitude
        )
        setCurrentWeatherData(currentWeather)
        setHourlyForecastData(hourlyForecast)
        setWeeklyWeatherData(weeklyForecast)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [currentLatitude, currentLongitude])
  useEffect(() => {
    const getCurrentLocation = async () => {
      setIsLoading(true)
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
          setHasLocationPermission(true)
        })
        setCurrentLatitude(position.coords.latitude)
        setCurrentLongitude(position.coords.longitude)
      } catch (error) {
        setHasLocationPermission(false)
        console.error(error)
      }
      setIsLoading(false)
    }
    getCurrentLocation()
    if (!hasLocationPermission) {
      setCurrentLatitude('44.436141') //Bucharest lat
      setCurrentLongitude('26.10626') //Bucharest lon
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favList))
  }, [favList])
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className='h-screen bg-primary text-primaryText text-center flex flex-col justify-center items-center w-full px-10'>
          <div className='flex item-center gap-1 mb-6'>
            <SearchInput onPlaceChanged={handlePlaceChanged} />
            <IconContext.Provider
              value={{ className: 'text-3xl text-gray-400 cursor-pointer' }}
            >
              <button
                title='My favorites'
                onClick={() => {
                  setIsFavShown(true)
                }}
              >
                {favList.length === 0 ? <MdBookmarkBorder /> : <MdBookmark />}
              </button>
            </IconContext.Provider>
          </div>
          <div className='w-96 rounded-2xl'>
            {currentWeatherData && (
              <CurrentWeather
                favList={favList}
                setFavList={setFavList}
                lat={currentWeatherData[0].lat}
                lon={currentWeatherData[0].lon}
                cityName={currentWeatherData[0].city_name}
                temperature={currentWeatherData[0].temp}
                statusCode={currentWeatherData[0].weather.code}
                description={currentWeatherData[0].weather.description}
                temperatureFeelsLike={currentWeatherData[0].app_temp}
                partOfTheDay={currentWeatherData[0].pod}
              />
            )}
          </div>
          <div className='flex items-center justify-center mb-2 mt-2 w-52 text-center '>
            <button
              className={`flex flex-row items-center justify-center text-center rounded-l-lg py-1 px-4 w-1/2 transition ${
                selectedOption === 'hourly'
                  ? 'bg-gray-700 text-white font-bold'
                  : 'bg-gray-300 text-gray-700 font-medium'
              }`}
              title='Show hourly forecast'
              onClick={() => setSelectedOption('hourly')}
            >
              <span className='mr-0.5'>Hourly</span>
              <IconContext.Provider value={{ className: 'mt-0.5 text-3xl' }}>
                <TbClockHour4 />
              </IconContext.Provider>
            </button>
            <button
              className={`flex flex-row items-center justify-center text-center rounded-r-lg py-2 px-2 w-1/2 transition ${
                selectedOption === 'daily'
                  ? 'bg-gray-700 text-white font-bold'
                  : 'bg-gray-300 text-gray-700 font-medium'
              }`}
              title='Show daily forecast'
              onClick={() => setSelectedOption('daily')}
            >
              <span className='mr-1'>Daily</span>
              <IconContext.Provider value={{ className: 'text-xl' }}>
                <BsCalendarDay />
              </IconContext.Provider>
            </button>
          </div>
          <div
            className={`flex ${
              selectedOption === 'daily' && 'lg:justify-center'
            } gap-2 overflow-auto w-5/6 mt-2`}
          >
            {hourlyForecastData &&
              selectedOption === 'hourly' &&
              hourlyForecastData.map((data, index) => {
                return (
                  <div
                    className='py-2 px-8 flex flex-col justify-center rounded-2xl border w-5/6'
                    key={index}
                  >
                    <HourlyForecast
                      weatherDescription={data.weather.description}
                      statusCode={data.weather.code}
                      localTimeStamp={data.timestamp_local}
                      temperature={Math.round(data.temp)}
                      partOfTheDay={data.pod}
                      className='h-44 overflow-hidden'
                    />
                  </div>
                )
              })}
            {weeklyWeatherData &&
              selectedOption === 'daily' &&
              weeklyWeatherData.map((data, index) => {
                return (
                  <div
                    className='p-2 flex flex-col justify-center rounded-2xl border'
                    key={index}
                  >
                    <DailyForecast
                      date={data.valid_date}
                      temperature={data.temp}
                      className='h-44 w-24 overflow-hidden'
                    />
                  </div>
                )
              })}
          </div>
        </div>
      )}
      <Modal
        isOpen={isFavShown}
        onClose={() => {
          setIsFavShown(false)
        }}
      >
        <FavList />
      </Modal>
    </>
  )
}
export default App
