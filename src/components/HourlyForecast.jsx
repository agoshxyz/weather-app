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
  console.log(partOfTheDay)
  const hour = moment(localTimeStamp).format('HH')
  return (
    <>
      <div className={className}>
        <div className='mb-4 font-bold text-xl'>{hour}</div>

        {partOfTheDay === 'd' ? (
          <WeatherStatusCodeDay
            statusCode={statusCode}
            className='mb-2'
            title={weatherDescription}
          />
        ) : (
          <WeatherStatusCodeNight
            statusCode={statusCode}
            className='mb-2'
            title={weatherDescription}
          />
        )}
        <div className='w-24'> {weatherDescription} </div>
        <p className='text-gray-800 font-bold text-3xl mt-2'>
          {Math.round(temperature)}
          <span className='text-xl'>°C</span>
        </p>
      </div>
    </>
  )
}
