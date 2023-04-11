import WeatherStatusCodeDay from './WeatherStatusCodeDay'
import WeatherStatusCodeNight from './WeatherStatusCodeNight'
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
  temperatureFeelsLike,
  partOfTheDay
}) {
  function handleToggleFavorite (lat, lon, cityName) {
    const isFavorite = favList.some(favorite => favorite.cityName === cityName)
    if (isFavorite) {
      setFavList(favList.filter(favorite => !(favorite.cityName === cityName)))
    } else {
      setFavList([...favList, { lat, lon, cityName }])
    }
  }
  function isFavorite (cityName) {
    return favList.some(favorite => favorite.cityName === cityName)
  }
  const favorite = isFavorite(cityName)
  return (
    <div className='flex flex-col items-center justify-center mb-4'>
      <div className='flex items-center justify-center gap-1 align-middle mb-3'>
        <h2
          className={`text-gray-800 font-bold ${
            cityName.length < 8 && 'text-6xl'
          } ${cityName.length > 7 && cityName.length < 13 && 'text-5xl'}
          ${cityName.length >= 13 && 'text-4xl'} `}
          data-cy='city-name'
        >
          {cityName}
        </h2>
        <FavButton
          lat={lat}
          lon={lon}
          cityName={cityName}
          isFavorite={favorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>

      {partOfTheDay === 'd' ? (
        <WeatherStatusCodeDay
          className='w-36 inline'
          title={description}
          statusCode={statusCode}
        />
      ) : (
        <WeatherStatusCodeNight
          className='w-36 inline'
          title={description}
          statusCode={statusCode}
        />
      )}

      <p
        className='text-gray-800 font-bold text-7xl mt-2'
        title='Temperature in °C'
      >
        {Math.round(temperature)}
        <span className='text-6xl'>°C</span>
      </p>
      <p>
        Feels like {Math.round(temperatureFeelsLike)}
        <span>°C</span>
      </p>
      <h3 className='text-gray-800 font-bold text-xl'>{description}</h3>
    </div>
  )
}
