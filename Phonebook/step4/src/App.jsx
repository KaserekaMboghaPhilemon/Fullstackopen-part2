import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Philemon Kasereka', number: '011-4366228', id: 2 },
    { name: 'Happy Mbambu', number: '075-5014877', id: 3 },
    { name: 'Fallon Mumbere', number: '073-9209076', id: 4 },
    { name: 'Fifi Kahindo', number: '073-8119313', id: 5 },
    { name: 'Fabien Kambale', number: '078-3188466', id: 6 },
    { name: 'Fanie Biira Melena', number: '077-5909877', id: 7 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') // 1. New state for filtering

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to your phonebook`)
      return
    }
    const personObject = { name: newName, number: newNumber, id: persons.length + 1 }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  // 2. LOGIC: Create the filtered list to display
  const personsToShow = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      {/* 3. The Search Input */}
      <div>
        filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <h3>Numbers</h3>
      {/* 4. Map over the FILTERED list, not the original persons array */}
      {personsToShow.map(person => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App