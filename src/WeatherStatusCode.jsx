import lightRain500 from './assets/lightRain.svg'
import lightSnow600 from './assets/lightSnow.svg'
import heavySnow602 from './assets/heavySnow.svg'
import mixSnowAndRain610 from './assets/mixSnowAndRain.svg'
export default function WeatherStatusCode ({ statusCode }) {
  let iconImage
  switch (statusCode) {
    case 500:
      iconImage = lightRain500
      break
    case 600:
      iconImage = lightSnow600
      breaks
    case 602:
      iconImage = heavySnow602
      break
    case 610:
      iconImage = mixSnowAndRain610
      break

    default:
      break
  }

  return (
    <>
      <img src={iconImage} alt='weatherIcon' className='w-36 h-36' />
      {statusCode}
    </>
  )
}
