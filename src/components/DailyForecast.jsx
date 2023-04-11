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
  let dayOfTheWeek = moment(date).format('ddd')
  let day = moment(date).format('DD')
  let month = moment(date).format('MM')
  return (
    <>
      <div className={className}>
        <time className='text-gray-800 font-bold text-lg mb-3 block'>
          {dayOfTheWeek} {day}/{month}
        </time>
        <WeatherStatusCodeDay
          statusCode={statusCode}
          className='mb-2 h-12'
          title={weatherDescription}
        />
        <h3 className='h-10'> {weatherDescription}</h3>
        <div
          className='flex bottom-0 gap-3 items-center justify-center font-medium w-full'
          title='7AM to 7PM'
        >
          <div className='text-gray-800 text-3xl mt-2' title='Low Temperature'>
            <p>
              {lowTemperature}
              <span className='text-xl'>°C</span>
            </p>
          </div>

          <div
            className='text-gray-800  text-3xl mt-2'
            title='High Temperature'
          >
            <p>
              {highTemperature}
              <span className='text-xl'>°C</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
