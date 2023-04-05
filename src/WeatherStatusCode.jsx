import lightRain500 from './assets/lightRain.svg'
import lightShowerRain520 from './assets/lightShowerRain.svg'
import showerRain521 from './assets/showerRain.svg'
import heavyShowerRain522 from './assets/heavyShowerRain.svg'
import lightSnow600 from './assets/lightSnow.svg'
import snow601 from './assets/snow.svg'
import heavySnow602 from './assets/heavySnow.svg'
import mixSnowAndRain610 from './assets/mixSnowAndRain.svg'
import flurries623 from './assets/flurries.svg'
export default function WeatherStatusCode ({ statusCode, className }) {
  let iconImage
  switch (statusCode) {
    case 500:
      iconImage = lightRain500
      break
    case 520:
      iconImage = lightShowerRain520
      break
    case 521:
      iconImage = showerRain521
      break
    case 522:
      iconImage = heavyShowerRain522
      break
    case 600:
      iconImage = lightSnow600
      break
    case 601:
      iconImage = snow601
      break
    case 602:
      iconImage = heavySnow602
      break
    case 610:
      iconImage = mixSnowAndRain610
      break
    case 623:
      iconImage = flurries623
      break
    default:
      break
  }

  return (
    <>
      <img src={iconImage} className={className} alt='weatherIcon' />
    </>
  )
}
