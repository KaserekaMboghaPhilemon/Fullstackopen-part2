import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    const search = event.target.value
    setValue(search)

    const filtered = countries.filter(c => 
      c.name.common.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredCountries(filtered)
  }

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange} />
      </form>
      
      {/* We pass setFilteredCountries so buttons can update the view */}
      <CountryList 
        countries={filteredCountries} 
        setFilteredCountries={setFilteredCountries} 
      />
    </div>
  )
}

export default App