import axios from 'axios'

const weatherbitAPI = axios.create({
  baseURL: 'https://api.weatherbit.io/v2.0',
  params: {
    key: import.meta.env.VITE_WEATHERBIT_API_KEY
  }
})

export function getCurrentWeather (lat, lon) {
  return new Promise((resolve, reject) => {
    weatherbitAPI
      .get('/current', {
        params: {
          lat,
          lon
        }
      })
      .then(response => resolve(response.data.data[0]))
      .catch(error => {
        reject(error)
      })
  })
}

export function getHourlyForecast (lat, lon, hours = 24) {
  return new Promise((resolve, reject) => {
    weatherbitAPI
      .get('/forecast/hourly', {
        params: {
          lat,
          lon,
          hours
        }
      })
      .then(response => resolve(response.data.data))
      .catch(error => {
        reject(error)
      })
  })
}

export function getWeeklyForecast (lat, lon) {
  return new Promise((resolve, reject) => {
    weatherbitAPI
      .get('/forecast/daily', {
        params: {
          lat,
          lon
        }
      })
      .then(response => resolve(response.data.data.slice(1, 8)))
      .catch(error => {
        reject(error)
      })
  })
}
