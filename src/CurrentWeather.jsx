import { IconContext } from 'react-icons'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import WeatherStatusCode from './WeatherStatusCode'
export default function CurrentWeather ({
  cityName,
  temperature,
  statusCode,
  description,
  temperatureFeelsLike
}) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center'>
        <p className='text-gray-800 font-bold text-6xl'>{cityName}</p>
        <IconContext.Provider value={{ className: 'text-gray-800 text-6xl' }}>
          <MdOutlineFavorite />
          <MdOutlineFavoriteBorder />
        </IconContext.Provider>
      </div>
      <WeatherStatusCode className='w-36' statusCode={statusCode} />
      <p className='text-gray-800 font-bold text-7xl'>
        {Math.round(temperature)}
        <span className='text-6xl'>°C</span>
      </p>
      <p>
        Feels like {Math.round(temperatureFeelsLike)}
        <span>°C</span>
      </p>
      <p className='text-gray-800 font-bold text-xl'>{description}</p>
    </div>
  )
}
