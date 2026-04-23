import CountryDetail from './CountryDetail'

const CountryList = ({ countries, setFilteredCountries }) => {
  // 1. Case: Too many results
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  // 2. Case: Exactly one result (Show details)
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  // 3. Case: 2-10 results (Show list with buttons)
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {countries.map(c => (
        <li key={c.cca3} style={{ marginBottom: '5px' }}>
          {c.name.common} {' '}
          <button onClick={() => setFilteredCountries([c])}>
            show
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList