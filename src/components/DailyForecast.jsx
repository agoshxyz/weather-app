import moment from 'moment'
export default function DailyForecast({date, temperature}) {
    let day = moment(date).format('dddd')
    return (
        <>
                   <p className='text-gray-800 font-bold text-lg'>
        {day}
        </p>
        <p className='text-gray-800 font-bold text-lg'>
                      {Math.round(temperature)}
                      <span className='text-xl'>°C</span>
                    </p>
        </>
    )
}