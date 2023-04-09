import moment from 'moment'
import WeatherStatusCodeDay from './WeatherStatusCodeDay'
export default function DailyForecast ({
  weatherDescription,
  statusCode,
  date,
  lowTemperature,
  highTemperature,
  className
}) {
  let day = moment(date).format('dddd')
  return (
    <>
      <div className={className}>
        <p className='text-gray-800 font-bold text-lg mb-3'>{day}</p>
        <WeatherStatusCodeDay
          statusCode={statusCode}
          className='mb-2'
          title={weatherDescription}
        />
        <p> {weatherDescription}</p>
        <div className='flex gap-3 items-center justify-center'>
          <p className='text-gray-800 font-bold text-3xl mt-2'>
            {lowTemperature}
            <span className='text-xl'>°C</span>
          </p>

          <p className='text-gray-800 font-bold text-3xl mt-2'>
            {highTemperature}
            <span className='text-xl'>°C</span>
          </p>
        </div>
      </div>
    </>
  )
}
