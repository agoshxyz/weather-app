import React from 'react'
import { mount } from '@cypress/react'
import CurrentWeather from './CurrentWeather'

describe('CurrentWeather', () => {
  it('renders', () => {
    const props = {
      favList: [],
      setFavList: () => {},
      lat: 47.63333,
      lon: 26.25,
      lon: 0,
      cityName: 'Suceava',
      temperature: 20,
      statusCode: 800,
      description: 'Clear Sky',
      temperatureFeelsLike: 22,
      partOfTheDay: 'd'
    }
    mount(<CurrentWeather {...props} />)

    cy.get('h2').should('contain', 'Suceava')
    cy.get('p').eq(0).should('contain', '20°C')
    cy.get('p').eq(1).should('contain', 'Feels like 22°C')
    cy.get('h3').should('contain', 'Clear Sky')
  })
})
