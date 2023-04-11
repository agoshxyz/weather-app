import moment from 'moment'
import WeatherStatusCodeDay from './WeatherStatusCodeDay'
export default function DailyForecast ({
  weatherDescription,
  statusCode,
  date,
  minTemperature,
  maxTemperature,
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
        <h3 className='h-8'> {weatherDescription}</h3>
        <div
          className='flex bottom-0 gap-4 items-center justify-center font-medium w-full'
          title='From Midnight to Midnight'
        >
          <div
            className={`text-gray-600 ${
              minTemperature || maxTemperature < 0 ? 'text-2xl' : 'text-3xl'
            }   mt-2`}
            title='Min Temperature'
          >
            <p className='leading-5'>
              {minTemperature}
              <div className='inline leading-8'>
                <span className='text-lg lead'>°C</span>
                <sup className='text-xs leading-3 inline'>min</sup>
              </div>
            </p>
          </div>
          <div
            className={`text-gray-700 ${
              minTemperature || maxTemperature < 0 ? 'text-2xl' : 'text-3xl'
            }  mt-2`}
            title='Min Temperature'
          >
            <p className='leading-5'>
              {maxTemperature}
              <div className='inline leading-8'>
                <span className='text-lg lead'>°C</span>
                <sup className='text-xs leading-3 inline'>max</sup>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
