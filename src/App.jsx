import { useState, useEffect } from 'react'
import axios from 'axios'
import image from './assets/snowy-5.svg'
function App () {
  const [isLoading, setIsLoading] = useState(false)
  const [currentLatitude, setCurrentLatitude] = useState(null)
  const [currentLongitude, setCurrentLongitude] = useState(null)
  const [currentWeatherData, setCurrentWeatherData] = useState(null)

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
    }
  }, [currentLatitude, currentLongitude])

  return (
    <>
      <div className='bg-gradient-to-r from-primary text-primaryText text-center flex flex-col justify-center items-center'>
        <div className='mb-2 mt-10'>
          <input
            className='border rounded-lg w-96 px-3 py-1 outline-none'
            placeholder='Search for any city'
          />
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='w-96 h-4/6 rounded-2xl'>
            {currentWeatherData && (
              <div className='flex flex-col items-center justify-center'>
                <p className='text-gray-800 font-bold text-6xl'>
                  {currentWeatherData[0].city_name}
                </p>
                  <img src={image} className='w-36 h-36'/>
                  <p className='text-gray-800 font-bold text-7xl'>
                    {currentWeatherData[0].temp}
                    <span className='text-6xl'>°C</span>
                  </p>
                <p className='text-gray-800 font-bold text-xl'>
                  {currentWeatherData[0].weather.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App
