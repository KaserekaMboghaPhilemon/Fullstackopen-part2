import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  // Fetch all countries on load
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Filter countries as the user types
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
      
      {/* Pass the filtered list to a separate component */}
      <CountryList countries={filteredCountries} />
    </div>
  )
}

export default App