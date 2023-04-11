import moment from 'moment'
import WeatherStatusCodeDay from './WeatherStatusCodeDay'
import WeatherStatusCodeNight from './WeatherStatusCodeNight'
export default function HourlyForecast ({
  localTimeStamp,
  temperature,
  statusCode,
  weatherDescription,
  partOfTheDay,
  className
}) {
  const hour = moment(localTimeStamp).format('HH')
  return (
    <>
      <div className={className}>
        <time className='mb-4 font-bold text-xl block'>{hour}</time>

        {partOfTheDay === 'd' ? (
          <WeatherStatusCodeDay
            statusCode={statusCode}
            className='mb-2 h-12'
            title={weatherDescription}
          />
        ) : (
          <WeatherStatusCodeNight
            statusCode={statusCode}
            className='mb-2 h-12'
            title={weatherDescription}
          />
        )}
        <h3 className=' h-8 leading-5'> {weatherDescription} </h3>
        <p className='text-gray-800 font-medium text-3xl mt-2'>
          {temperature}
          <span className='text-xl'>°C</span>
        </p>
      </div>
    </>
  )
}
