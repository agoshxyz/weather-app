import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { IconContext } from 'react-icons'
import { MdBookmarkBorder } from 'react-icons/md'
import HourlyForecast from './components/HourlyForecast'
import LoadingScreen from './components/LoadingScreen'
import DailyForecast from './components/DailyForecast'
import CurrentWeather from './components/CurrentWeather'
import { WeatherContext } from './contexts/WeatherContext'
import Modal from './components/Modal'
import FavList from './components/FavList'
import SearchInput from './components/SearchInput'

function App () {
  const [isLoading, setIsLoading] = useState(false)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [isFavShown, setIsFavShown] = useState(false)
  const [currentLatitude, setCurrentLatitude] = useState('44.43225') //Bucharest lat
  const [currentLongitude, setCurrentLongitude] = useState('26.10626') //Bucharest lon
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
    axios
      .get('https://api.weatherbit.io/v2.0/current/', {
        params: {
          lat: currentLatitude,
          lon: currentLongitude,
          key: import.meta.env.VITE_WEATHERBIT_API_KEY
        }
      })
      .then(response => {
        setCurrentWeatherData(response.data.data)
        console.log(response.data.data)
      })
      .then(
        axios
          .get('https://api.weatherbit.io/v2.0/forecast/hourly/', {
            params: {
              lat: currentLatitude,
              lon: currentLongitude,
              key: import.meta.env.VITE_WEATHERBIT_API_KEY,
              hours: 24
            }
          })
          .then(response => {
            console.log(response.data.data)
            setHourlyForecastData(response.data.data)
          })
      )
      .then(
        axios
          .get('https://api.weatherbit.io/v2.0/forecast/daily/', {
            params: {
              lat: currentLatitude,
              lon: currentLongitude,
              key: import.meta.env.VITE_WEATHERBIT_API_KEY
            }
          })
          .then(response => {
            setWeeklyWeatherData(response.data.data.slice(1, 8))
          })
      )
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
    if (hasLocationPermission) {
      axios
        .get('https://api.weatherbit.io/v2.0/current/', {
          params: {
            lat: currentLatitude,
            lon: currentLongitude,
            key: import.meta.env.VITE_WEATHERBIT_API_KEY
          }
        })
        .then(response => {
          setCurrentWeatherData(response.data.data)
          console.log(response.data.data)
        })
        .then(
          axios
            .get('https://api.weatherbit.io/v2.0/forecast/hourly/', {
              params: {
                lat: currentLatitude,
                lon: currentLongitude,
                key: import.meta.env.VITE_WEATHERBIT_API_KEY,
                hours: 24
              }
            })
            .then(response => {
              console.log(response.data.data)
              setHourlyForecastData(response.data.data)
            })
        )
        .then(
          axios
            .get('https://api.weatherbit.io/v2.0/forecast/daily/', {
              params: {
                lat: currentLatitude,
                lon: currentLongitude,
                key: import.meta.env.VITE_WEATHERBIT_API_KEY
              }
            })
            .then(response => {
              setWeeklyWeatherData(response.data.data.slice(1, 8))
            })
        )
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
        <div className='h-screen bg-primary text-primaryText text-center flex flex-col justify-center items-center w-full'>
          <div className='flex item-center gap-1 mb-6'>
            <SearchInput onPlaceChanged={handlePlaceChanged} />
            <IconContext.Provider
              value={{ className: 'text-3xl text-gray-400 cursor-pointer' }}
            >
              <button
                onClick={() => {
                  setIsFavShown(true)
                }}
              >
                <MdBookmarkBorder />
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
              />
            )}
          </div>
          <div className='flex items-center justify-center mb-2 mt-2'>
            <button
              className={`rounded-l-lg py-2 px-4 ${
                selectedOption === 'hourly'
                  ? 'bg-gray-700 text-white font-bold'
                  : 'bg-gray-300 text-gray-700 font-medium'
              }`}
              onClick={() => setSelectedOption('hourly')}
            >
              Hourly
            </button>
            <button
              className={`rounded-r-lg py-2 px-4 ${
                selectedOption === 'daily'
                  ? 'bg-gray-700 text-white font-bold'
                  : 'bg-gray-300 text-gray-700 font-medium'
              }`}
              onClick={() => setSelectedOption('daily')}
            >
              Daily
            </button>
          </div>
          <div
            className={`flex ${
              selectedOption === 'daily' && 'justify-center'
            } gap-2 overflow-auto w-5/6 mt-2`}
          >
            {hourlyForecastData &&
              selectedOption === 'hourly' &&
              hourlyForecastData.map((data, index) => {
                return (
                  <div
                    className='py-2 px-8 flex flex-col justify-between rounded-2xl border'
                    key={index}
                  >
                    <HourlyForecast
                      weatherDescription={data.weather.description}
                      statusCode={data.weather.code}
                      localTimeStamp={data.timestamp_local}
                      temperature={data.temp}
                    />
                  </div>
                )
              })}
            {weeklyWeatherData &&
              selectedOption === 'daily' &&
              weeklyWeatherData.map((data, index) => {
                return (
                  <div
                    className='p-2 flex flex-col rounded-2xl border'
                    key={index}
                  >
                    <DailyForecast
                      date={data.valid_date}
                      temperature={data.temp}
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
