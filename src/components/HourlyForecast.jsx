import moment from 'moment'
import WeatherStatusCodeDay from './WeatherStatusCodeDay'
export default function HourlyForecast ({
  localTimeStamp,
  temperature,
  statusCode,
  weatherDescription,
  className
}) {
  const hour = moment(localTimeStamp).format('HH')
  return (
    <>
      <div className={className}>
        <div className='mb-4 font-bold text-xl'>{hour}</div>
        <WeatherStatusCodeDay
          statusCode={statusCode}
          className='mb-2'
          title={weatherDescription}
        />
        <div className='w-24'> {weatherDescription} </div>
        <p className='text-gray-800 font-bold text-3xl mt-2'>
          {Math.round(temperature)}
          <span className='text-xl'>°C</span>
        </p>
      </div>
    </>
  )
}
