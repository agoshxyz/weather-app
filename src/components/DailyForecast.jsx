import moment from 'moment'
export default function DailyForecast ({ date, temperature, className }) {
  let day = moment(date).format('dddd')
  return (
    <>
      <div className={className}>
        <p className='text-gray-800 font-bold text-lg'>{day}</p>
        <p className='text-gray-800 font-bold text-lg'>
          {Math.round(temperature)}
          <span className='text-xl'>°C</span>
        </p>
      </div>
    </>
  )
}
