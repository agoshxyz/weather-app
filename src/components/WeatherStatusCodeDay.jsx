import thunderstormWithLightRain200 from '../assets/weatherIcons/day/thunderstormWithLightRain.svg'
import thunderStormWithRain201 from '../assets/weatherIcons/day/thunderstormWithRain.svg'
import thunderStormWithHeavyRain202 from '../assets/weatherIcons/day/thunderstormWithHeavyRain.svg'
import thunderStormWithLightDrizzle230 from '../assets/weatherIcons/day/thunderstormWithLightDrizzle.svg'
import thunderStormWithDrizzle231 from '../assets/weatherIcons/day/thunderstormWithDrizzle.svg'
import thunderStormWithHeavyDrizzle232 from '../assets/weatherIcons/day/thunderstormWithHeavyDrizzle.svg'
import thunderStormWithHail233 from '../assets/weatherIcons/day/thunderstormWithHail.svg'

import lightDrizzle300 from '../assets/weatherIcons/general/lightDrizzle.svg'
import drizzle301 from '../assets/weatherIcons/general/drizzle.svg'
import heavyDrizzle302 from '../assets/weatherIcons/general/heavyDrizzle.svg'

import lightRain500 from '../assets/weatherIcons/general/lightRain.svg'
import moderateRain501 from '../assets/weatherIcons/general/moderateRain.svg'
import heavyRain502 from '../assets/weatherIcons/general/heavyRain.svg'
import freezingRain511 from '../assets/weatherIcons/general/freezingRain.svg'
import lightShowerRain520 from '../assets/weatherIcons/general/lightShowerRain.svg'
import showerRain521 from '../assets/weatherIcons/general/showerRain.svg'
import heavyShowerRain522 from '../assets/weatherIcons/general/heavyShowerRain.svg'

import lightSnow600 from '../assets/weatherIcons/day/lightSnow.svg'
import snow601 from '../assets/weatherIcons/general/snow.svg'
import heavySnow602 from '../assets/weatherIcons/general/heavySnow.svg'
import mixSnowAndRain610 from '../assets/weatherIcons/day/mixSnowAndRain.svg'
import sleet611 from '../assets/weatherIcons/general/sleet.svg'
import heavySleet612 from '../assets/weatherIcons/general/heavySleet.svg'
import snowShower621 from '../assets/weatherIcons/day/snowShower.svg'
import heavySnowShower622 from '../assets/weatherIcons/general/heavySnowShower.svg'
import flurries623 from '../assets/weatherIcons/general/flurries.svg'

import mist700 from '../assets/weatherIcons/day/mist.svg'
import smoke711 from '../assets/weatherIcons/day/smoke.svg'
import haze721 from '../assets/weatherIcons/day/haze.svg'
import sandDust731 from '../assets/weatherIcons/day/sandDust.svg'
import fog741 from '../assets/weatherIcons/day/fog.svg'
import freezingFog751 from '../assets/weatherIcons/day/freezingFog.svg'

import clearSky800 from '../assets/weatherIcons/day/clearSky.svg'
import fewClouds801 from '../assets/weatherIcons/day/fewClouds.svg'
import scatteredClouds802 from '../assets/weatherIcons/day/scatteredClouds.svg'
import brokenClouds803 from '../assets/weatherIcons/day/brokenClouds.svg'
import overcastClouds804 from '../assets/weatherIcons/general/overcastClouds.svg'

import unknownPrecipitation900 from '../assets/weatherIcons/general/unknownPrecipitation.svg'
export default function WeatherStatusCodeDay ({ statusCode, className, title }) {
  let iconImage
  switch (statusCode) {
    case 200:
      iconImage = thunderstormWithLightRain200
      break
    case 201:
      iconImage = thunderStormWithRain201
      break
    case 202:
      iconImage = thunderStormWithHeavyRain202
      break
    case 230:
      iconImage = thunderStormWithLightDrizzle230
      break
    case 231:
      iconImage = thunderStormWithDrizzle231
      break
    case 232:
      iconImage = thunderStormWithHeavyDrizzle232
      break
    case 233:
      iconImage = thunderStormWithHail233
      break
    case 300:
      iconImage = lightDrizzle300
      break
    case 301:
      iconImage = drizzle301
      break
    case 302:
      iconImage = heavyDrizzle302
      break
    case 500:
      iconImage = lightRain500
      break
    case 501:
      iconImage = moderateRain501
      break
    case 502:
      iconImage = heavyRain502
      break
    case 511:
      iconImage = freezingRain511
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
    case 611:
      iconImage = sleet611
      break
    case 612:
      iconImage = heavySleet612
      break
    case 621:
      iconImage = snowShower621
      break
    case 622:
      iconImage = heavySnowShower622
      break
    case 623:
      iconImage = flurries623
      break
    case 700:
      iconImage = mist700
      break
    case 711:
      iconImage = smoke711
      break
    case 721:
      iconImage = haze721
      break
    case 731:
      iconImage = sandDust731
      break
    case 741:
      iconImage = fog741
      break
    case 751:
      iconImage = freezingFog751
      break
    case 800:
      iconImage = clearSky800
      break
    case 801:
      iconImage = fewClouds801
      break
    case 802:
      iconImage = scatteredClouds802
      break
    case 803:
      iconImage = brokenClouds803
      break
    case 804:
      iconImage = overcastClouds804
      break
    case 900:
      iconImage = unknownPrecipitation900
      break
    default:
      iconImage = unknownPrecipitation900
      break
  }

  return (
    <>
      <img
        src={iconImage}
        className={'inline ' + className}
        alt='weatherIcon'
        title={title}
      />
    </>
  )
}
