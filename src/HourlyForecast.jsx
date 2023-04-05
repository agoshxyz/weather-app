import moment from 'moment'
import WeatherStatusCode from './WeatherStatusCode'
export default function HourlyForecast ({
  localTimeStamp,
  temperature,
  statusCode
}) {
  console.log(localTimeStamp)
  const hour = moment(localTimeStamp).format('HH')
  console.log(hour)
  return (
    <>
    <div className='mb-2'>
    {hour}
    </div>
      <WeatherStatusCode statusCode={statusCode}/>
      <p className='text-gray-800 font-bold text-lg mt-2'>
        {Math.round(temperature)}
        <span className='text-xl'>°C</span>
      </p>
    </>
  )
}
