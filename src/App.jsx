import { useState, useEffect } from 'react'
import axios from 'axios'
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
        })
    }
  }, [currentLatitude, currentLongitude])

  return (
    <div className='bg-red-300 text-center'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Latitude: {currentLatitude}</p>
          <p>Longitude: {currentLongitude}</p>
          {currentWeatherData && (
            <div>
              <p>City: {currentWeatherData[0].city_name}</p>
              <p>Temperature: {currentWeatherData[0].temp}</p>
              <p>Weather: {currentWeatherData[0].weather.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
