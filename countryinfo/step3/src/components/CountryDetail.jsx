import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY
  const capital = country.capital ? country.capital[0] : null

  useEffect(() => {
    if (capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => console.log('Weather fetch error:', error))
    }
  }, [capital, api_key])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {capital}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      
      <img src={country.flags.png} alt="flag" width="150" />

      {weather && (
        <div>
          <h2>Weather in {capital}</h2>
          <div>temperature {weather.main.temp} Celsius</div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="weather icon" 
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

export default CountryDetail