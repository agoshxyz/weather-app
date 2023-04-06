import { useState, createContext } from 'react'

const savedFavorites = localStorage.getItem('favorites')
  ? JSON.parse(localStorage.getItem('favorites'))
  : []

export const WeatherContext = createContext({})

export function WeatherContextProvider ({ children }) {
  const [favList, setFavList] = useState(savedFavorites)
  return (
    <WeatherContext.Provider value={{ favList, setFavList }}>
      {children}
    </WeatherContext.Provider>
  )
}
