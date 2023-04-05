import { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherStatusCode from './WeatherStatusCode'
import HourlyForecast from './HourlyForecast'
import LoadingScreen from './LoadingScreen'
function App () {
  const [isLoading, setIsLoading] = useState(false)
  const [currentLatitude, setCurrentLatitude] = useState('44.43225') //Bucharest lat
  const [currentLongitude, setCurrentLongitude] = useState('26.10626') //Bucharest lon
  const [currentWeatherData, setCurrentWeatherData] = useState(null)
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null)
  const [hourlyForecastData, setHourlyForecastData] = useState(null)
  const [selectedOption, setSelectedOption] = useState('hourly')

  useEffect(() => {
    const getCurrentLocation = async () => {
      setIsLoading(true)
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        setCurrentLatitude(position.coords.latitude)
        setCurrentLongitude(position.coords.longitude)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    getCurrentLocation()
    if (currentLatitude && currentLongitude) {
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
  }, [currentLatitude, currentLongitude])

  return (
    <>
      {/* <WeatherStatusCode/> */}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className='bg-primary text-primaryText text-center flex flex-col justify-center items-center w-full'>
          <div className='mb-2 mt-10'>
            <input
              className='border rounded-lg w-96 px-3 py-1 outline-none'
              placeholder='Search for any city'
            />
          </div>
          <div className='w-96 h-4/6 rounded-2xl'>
            {currentWeatherData && (
              <div className='flex flex-col items-center justify-center'>
                <p className='text-gray-800 font-bold text-6xl'>
                  {currentWeatherData[0].city_name}
                </p>
                <WeatherStatusCode
                  className='w-36'
                  statusCode={currentWeatherData[0].weather.code}
                />
                <p className='text-gray-800 font-bold text-7xl'>
                  {Math.round(currentWeatherData[0].temp)}
                  <span className='text-6xl'>°C</span>
                </p>
                <p>
                  Feels like {Math.round(currentWeatherData[0].app_temp)}
                  <span>°C</span>
                </p>
                <p className='text-gray-800 font-bold text-xl'>
                  {currentWeatherData[0].weather.description}
                </p>
              </div>
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
          <div className='flex items-center justify-center gap-2 overflow-auto w-5/6 mt-2'>
            {hourlyForecastData &&
              selectedOption === 'hourly' &&
              hourlyForecastData.map((data, index) => {
                return (
                  <div
                    className='py-2 px-8 flex flex-col justify-between h-1/6 rounded-2xl border'
                    key={index}
                  >
                    <HourlyForecast
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
                    className='p-2 flex flex-col justify-between h-1/6 rounded-2xl border'
                    key={index}
                  >
                    <p className='text-gray-800 font-bold text-lg'>
                      {data.datetime}
                    </p>
                    <p className='text-gray-800 font-bold text-lg'>
                      {Math.round(data.temp)}
                      <span className='text-xl'>°C</span>
                    </p>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}

export default App
