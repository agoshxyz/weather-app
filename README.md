# Weather App for Technical Evaluation
Live URL
 [https://cumevremea.xyz](http://cumevremea.xyz)

## Demo
![Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJkNDU1ODg3Y2UyNGYyM2NiYzg2OWQ3ZjdmOTFjNzBlNjc4Yzk0MSZjdD1n/f23lQwIx98qESFYYPt/giphy.gif)

## Features Implemented
- Current city weather
- Search for address (airport, city etc.)
- Hourly forecast
- Daily forecast
- Add/remove favorite cities
- See current weather of favorite cities

## Design
Credits for weather icons [Alexey Onufriev](https://dribbble.com/shots/3761552-Free-Weather-Icons)

Modified weather icons made by me for this project [Figma Link](https://www.figma.com/file/B3UcwKfNRNfZSnnnOShERv/Weather-Icons?node-id=0%3A1&t=ymOtNhS5JfkNHl8w-1)

## Run Locally
### Prerequisites

- Node.js
- yarn
### Please follow these steps to run the project locally
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/agoshxyz/weather-app.git
   ```
2. Go to the folder
   ```sh
   cd weather-app
   ```
3. Copy the .env.example to .env (for environment variables)
    ```sh
   cp .env.example .env //macOS, linux
   ```
   ```sh
   copy .env.example .env //windows cmd
   ```
  
4. Install the packages
   ```sh
   yarn
   ```
5. Start the development server
   
   ```sh
   yarn dev
   ```
6. Open your browser and navigate to http://localhost:5173/ to view the app.

### Building the App
To build the app for production, run:
 ```sh
yarn build
```
## Run Tests
 ```sh
yarn cypress
```

This will create a production-ready build of the app in the dist directory.
### Environment Variables
If you would like to generate your own API keys:

VITE_WEATHERBIT_API_KEY - Get your own Weatherbit API key from https://www.weatherbit.io

VITE_MAPS_API_KEY - Get your own Google Maps API key from https://developers.google.com/maps