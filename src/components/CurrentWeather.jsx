import WeatherStatusCode from './WeatherStatusCode'
import FavButton from './FavButton'
export default function CurrentWeather ({
  favList,
  setFavList,
  lat,
  lon,
  cityName,
  temperature,
  statusCode,
  description,
  temperatureFeelsLike
}) {
  function handleToggleFavorite (lat, lon) {
    const isFavorite = favList.some(
      favorite => favorite.lat === lat && favorite.lon === lon
    )
    if (isFavorite) {
      setFavList(
        favList.filter(
          favorite => !(favorite.lat === lat && favorite.lon === lon)
        )
      )
    } else {
      setFavList([...favList, { lat, lon, cityName }])
    }
  }

  function isFavorite (lat, lon) {
    return favList.some(
      favorite => favorite.lat === lat && favorite.lon === lon
    )
  }
  const favorite = isFavorite(lat, lon)
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center'>
        <p className='text-gray-800 font-bold text-6xl'>{cityName}</p>
        <FavButton
          lat={lat}
          lon={lon}
          isFavorite={favorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      <WeatherStatusCode className='w-36' statusCode={statusCode} />
      <p className='text-gray-800 font-bold text-7xl'>
        {Math.round(temperature)}
        <span className='text-6xl'>°C</span>
      </p>
      <p>
        Feels like {Math.round(temperatureFeelsLike)}
        <span>°C</span>
      </p>
      <p className='text-gray-800 font-bold text-xl'>{description}</p>
    </div>
  )
}
