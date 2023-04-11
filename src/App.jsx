import { useState, useEffect, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Parallax } from 'swiper'
import 'swiper/swiper.css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/mousewheel'
import 'swiper/css/parallax'
import { IconContext } from 'react-icons'
import { TbClockHour4 } from 'react-icons/tb'
import { RiEmotionSadLine } from 'react-icons/ri'
import {
  MdOutlineErrorOutline,
  MdBookmarkBorder,
  MdBookmark
} from 'react-icons/md'
import { BsCalendarDay } from 'react-icons/bs'
import { WeatherContext } from './contexts/WeatherContext'
import LoadingScreen from './components/LoadingScreen'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import Modal from './components/Modal'
import FavList from './components/FavList'
import SearchInput from './components/SearchInput'
import { isMobile } from 'react-device-detect'
function App () {
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [selectedOption, setSelectedOption] = useState('hourly')
  const {
    favList,
    setFavList,
    isLoading,
    isError,
    setCurrentLatitude,
    setCurrentLongitude,
    currentWeatherData,
    hourlyForecastData,
    weeklyWeatherData,
    fetchWeatherData,
    isFavShown,
    setIsFavShown
  } = useContext(WeatherContext)
  const handlePlaceChanged = (lat, lng) => {
    setCurrentLatitude(lat)
    setCurrentLongitude(lng)
    fetchWeatherData(lat, lng)
  }
  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        setHasLocationPermission(true)
      })
      fetchWeatherData(position.coords.latitude, position.coords.longitude)
    } catch (error) {
      setHasLocationPermission(false)
      if (!hasLocationPermission) {
        fetchWeatherData('44.436141', '26.10626') //Bucharest coordinates
      }
      console.error(error.message)
    }
  }
  async function runOnPageLoad () {
    await getCurrentLocation()
  }
  useEffect(() => {
    runOnPageLoad()
  }, [])
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favList))
  }, [favList])
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <div className='flex flex-col w-screen h-screen items-center justify-center'>
          <p className='flex gap-1 items-center text-5xl mb-3 text-gray-700'>
            We apologize <RiEmotionSadLine />
          </p>
          <p className='text-2xl flex items-center text-gray-600'>
            <span className='mr-0.5  mb-1'>
              <a href='https://www.weatherbit.io/' className='text-blue-900'>
                weatherbit.io
              </a>{' '}
              is not responding{' '}
            </span>
            <MdOutlineErrorOutline />
          </p>
          <p className='text-red-400'>Try again later please!</p>
        </div>
      ) : (
        <div className='h-screen bg-primary text-center flex flex-col justify-center items-center w-screen'>
          <div className='mr-3 ml-3'>
            <section
              className={`flex item-center mb-6 justify-center w-full ${
                isMobile && '-mt-12'
              }`}
            >
              <SearchInput onPlaceChanged={handlePlaceChanged} />
              <IconContext.Provider
                value={{ className: 'text-3xl text-gray-400 cursor-pointer' }}
              >
                <button
                  title='My favorites'
                  onClick={() => {
                    setIsFavShown(true)
                  }}
                >
                  {favList.length === 0 ? <MdBookmarkBorder /> : <MdBookmark />}
                </button>
              </IconContext.Provider>
            </section>
          </div>
          <section className='w-96 rounded-2xl'>
            {currentWeatherData && (
              <CurrentWeather
                favList={favList}
                setFavList={setFavList}
                lat={currentWeatherData.lat}
                lon={currentWeatherData.lon}
                cityName={currentWeatherData.city_name}
                temperature={currentWeatherData.temp}
                statusCode={currentWeatherData.weather.code}
                description={currentWeatherData.weather.description}
                temperatureFeelsLike={currentWeatherData.app_temp}
                partOfTheDay={currentWeatherData.pod}
              />
            )}
          </section>
          <div className='flex items-center justify-center mb-2 mt-2 w-52 text-center '>
            <button
              className={`flex flex-row items-center justify-center text-center rounded-l-lg py-1 px-4 w-1/2 transition ${
                selectedOption === 'hourly'
                  ? 'bg-gray-700 text-white font-bold'
                  : 'bg-gray-300 text-gray-700 font-medium'
              }`}
              title='Show hourly forecast'
              onClick={() => setSelectedOption('hourly')}
            >
              <span className='mr-0.5'>Hourly</span>
              <IconContext.Provider value={{ className: 'mt-0.5 text-3xl' }}>
                <TbClockHour4 />
              </IconContext.Provider>
            </button>
            <button
              className={`flex flex-row items-center justify-center text-center rounded-r-lg py-2 px-2 w-1/2 transition ${
                selectedOption === 'daily'
                  ? 'bg-gray-700 text-white font-bold'
                  : 'bg-gray-300 text-gray-700 font-medium'
              }`}
              title='Show daily forecast'
              onClick={() => setSelectedOption('daily')}
            >
              <span className='mr-1'>Daily</span>
              <IconContext.Provider value={{ className: 'text-xl' }}>
                <BsCalendarDay />
              </IconContext.Provider>
            </button>
          </div>
          <div className={`flex justify-center w-11/12 gap-2 rounded-lg mt-2`}>
            <Swiper
              modules={[Mousewheel, Parallax]}
              mousewheel={true}
              parallax={true}
              initialSlide={0}
              spaceBetween={12}
              breakpoints={{
                320: {
                  slidesPerView: 2
                },
                480: {
                  slidesPerView: 3
                },
                640: {
                  slidesPerView: 4
                },
                768: {
                  slidesPerView: 5
                },
                1024: {
                  slidesPerView: 7
                }
              }}
            >
              {hourlyForecastData &&
                selectedOption === 'hourly' &&
                hourlyForecastData.map((data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className='py-2 px-1 flex flex-col justify-center rounded-2xl border'>
                        <HourlyForecast
                          weatherDescription={data.weather.description}
                          statusCode={data.weather.code}
                          localTimeStamp={data.timestamp_local}
                          temperature={Math.round(data.temp)}
                          partOfTheDay={data.pod}
                          className='h-44 overflow-hidden'
                        />
                      </div>
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          <div className={`flex justify-center w-11/12  gap-2 rounded-lg mt-2`}>
            <Swiper
              slidesPerView={2}
              modules={[Mousewheel, Parallax]}
              mousewheel={true}
              parallax={true}
              initialSlide={0}
              spaceBetween={12}
              breakpoints={{
                320: {
                  slidesPerView: 2
                },
                480: {
                  slidesPerView: 3
                },
                640: {
                  slidesPerView: 4
                },
                768: {
                  slidesPerView: 5
                },
                1024: {
                  slidesPerView: 7
                }
              }}
            >
              {weeklyWeatherData &&
                selectedOption === 'daily' &&
                weeklyWeatherData.map((data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className='w-full py-2 px-2 flex flex-col justify-center rounded-2xl border'>
                        <DailyForecast
                          weatherDescription={data.weather.description}
                          statusCode={data.weather.code}
                          date={data.valid_date}
                          minTemperature={Math.round(data.min_temp)}
                          maxTemperature={Math.round(data.max_temp)}
                          className='h-44'
                        />
                      </div>
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
          <Modal
            isOpen={isFavShown}
            onClose={() => {
              setIsFavShown(false)
            }}
          >
            <FavList />
          </Modal>
        </div>
      )}
    </>
  )
}
export default App
