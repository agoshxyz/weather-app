import moment from 'moment'
import WeatherStatusCode from './WeatherStatusCode'
export default function HourlyForecast ({
  localTimeStamp,
  temperature,
  statusCode,
  weatherDescription
}) {
  const hour = moment(localTimeStamp).format('HH')
  return (
    <>
    <div className='mb-2'>
    {hour}
    </div>
      <WeatherStatusCode statusCode={statusCode}/>
      {weatherDescription}
      <p className='text-gray-800 font-bold text-lg mt-2'>
        {Math.round(temperature)}
        <span className='text-xl'>°C</span>
      </p>
    </>
  )
}
