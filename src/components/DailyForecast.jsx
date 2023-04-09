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
        <p className='text-gray-800 font-bold text-lg mb-3'>
          {dayOfTheWeek} {day}/{month}
        </p>
        <WeatherStatusCodeDay
          statusCode={statusCode}
          className='mb-2 h-12'
          title={weatherDescription}
        />
        <p className=''> {weatherDescription}</p>
        <div
          className='flex bottom-0 gap-3 items-center justify-center'
          title='7AM to 7PM'
        >
          <p
            className='text-gray-800 font-bold text-3xl mt-2'
            title='Low Temperature'
          >
            <span>
              <div>
                {lowTemperature}
                <span className='text-xl'>°C</span>
              </div>
            </span>
          </p>

          <p
            className='text-gray-800 font-bold text-3xl mt-2'
            title='High Temperature'
          >
            {highTemperature}
            <span className='text-xl'>°C</span>
          </p>
        </div>
      </div>
    </>
  )
}
