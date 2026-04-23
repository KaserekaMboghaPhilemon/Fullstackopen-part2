import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' } // Added number here
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') // 1. New state for number

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value) // 2. Handler for number

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to your phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber // 3. Add number to the object
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('') // 4. Clear number input
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          {/* 5. New input field for numbers */}
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App