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
        <div className='text-gray-800 font-bold text-lg mb-3'>
          {dayOfTheWeek} {day}/{month}
        </div>
        <WeatherStatusCodeDay
          statusCode={statusCode}
          className='mb-2 h-12'
          title={weatherDescription}
        />
        <div className='h-10'> {weatherDescription}</div>
        <div
          className='flex bottom-0 gap-3 items-center justify-center font-medium w-full'
          title='7AM to 7PM'
        >
          <div
            className='text-gray-800 text-3xl mt-2'
            title='Low Temperature'
          >
              <div>
                {lowTemperature}
                <span className='text-xl'>°C</span>
              </div>
          </div>

          <div
            className='text-gray-800  text-3xl mt-2'
            title='High Temperature'
          >
            {highTemperature}
            <span className='text-xl'>°C</span>
          </div>
        </div>
      </div>
    </>
  )
}
