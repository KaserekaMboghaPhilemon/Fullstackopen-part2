import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  // Initialize with an empty array because data will come from server
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // 3. The Hook: This runs once when the component is first rendered
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data) // This updates the state with server data
      })
  }, []) // The empty array [] means this only runs ONCE

  const addPerson = (event) => {
    event.preventDefault()
    // (Keep your existing addPerson logic for now)
    const personObject = { name: newName, number: newNumber, id: persons.length + 1 }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        numValue={newNumber}
        onNumChange={(e) => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App