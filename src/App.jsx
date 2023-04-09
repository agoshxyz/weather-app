import { useState, useEffect, useContext } from 'react'
import { IconContext } from 'react-icons'
import { TbClockHour4 } from 'react-icons/tb'
import { RiEmotionSadLine } from 'react-icons/ri'
import {
  MdOutlineErrorOutline,
  MdBookmarkBorder,
  MdBookmark
} from 'react-icons/md'
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
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [isFavShown, setIsFavShown] = useState(false)
  const [currentLatitude, setCurrentLatitude] = useState(null)
  const [currentLongitude, setCurrentLongitude] = useState(null)
  const [currentWeatherData, setCurrentWeatherData] = useState(null)
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null)
  const [hourlyForecastData, setHourlyForecastData] = useState(null)
  const [selectedOption, setSelectedOption] = useState('hourly')
  const { favList, setFavList } = useContext(WeatherContext)
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
  const handlePlaceChanged = (lat, lng) => {
    setCurrentLatitude(lat)
    setCurrentLongitude(lng)
    fetchWeatherData(lat, lng)
  }
  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        setHasLocationPermission(true)
      })

      fetchWeatherData(position.coords.latitude, position.coords.longitude)
    } catch (error) {
      setHasLocationPermission(false)
      if (!hasLocationPermission) {
        fetchWeatherData('44.436141', '26.10626') //Bucharest coordinates
      }
      console.error(error.message)
    }
  }
  async function runOnPageLoad () {
    await getCurrentLocation()
  }
  useEffect(() => {
    runOnPageLoad()
  }, [])
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favList))
  }, [favList])
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <div className='flex flex-col w-screen h-screen items-center justify-center'>
          <p className='flex gap-1 items-center text-5xl mb-3 text-gray-700'>
            We apologize <RiEmotionSadLine />
          </p>
          <p className='text-2xl flex items-center text-gray-600'>
            <span className='mr-0.5  mb-1'>
              <a href='https://www.weatherbit.io/' className='text-blue-900'>
                weatherbit.io
              </a>{' '}
              is not responding{' '}
            </span>
            <MdOutlineErrorOutline />
          </p>
          <p className='text-red-400'>Try again later please!</p>
        </div>
      ) : (
        <div className='h-screen bg-primary text-center flex flex-col justify-center items-center w-screen'>
          <div className='mr-3 ml-3'>
            <div className='flex item-center mb-6 justify-center w-full'>
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
          </div>
          <div className='w-96 rounded-2xl'>
            {currentWeatherData && (
              <CurrentWeather
                favList={favList}
                setFavList={setFavList}
                lat={currentWeatherData.lat}
                lon={currentWeatherData.lon}
                cityName={currentWeatherData.city_name}
                temperature={currentWeatherData.temp}
                statusCode={currentWeatherData.weather.code}
                description={currentWeatherData.weather.description}
                temperatureFeelsLike={currentWeatherData.app_temp}
                partOfTheDay={currentWeatherData.pod}
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
            className={`flex
          ${selectedOption === 'hourly' && 'w-11/12'}
          ${
            selectedOption === 'daily' && 'lg:justify-center w-5/6 '
          } gap-2 overflow-auto   rounded-lg mt-2`}
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
                      weatherDescription={data.weather.description}
                      statusCode={data.weather.code}
                      date={data.valid_date}
                      lowTemperature={Math.round(data.low_temp)}
                      highTemperature={Math.round(data.high_temp)}
                      className='h-44 w-36 overflow-hidden'
                    />
                  </div>
                )
              })}
          </div>
          <Modal
            isOpen={isFavShown}
            onClose={() => {
              setIsFavShown(false)
            }}
          >
            <FavList />
          </Modal>
        </div>
      )}
    </>
  )
}
export default App
