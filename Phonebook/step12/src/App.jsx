import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const showNotification = (msg, type = 'success') => {
    setMessageType(type)
    setMessage(msg)
    setTimeout(() => setMessage(null), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      if (window.confirm(`${newName} is already added, update the number?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            showNotification(`Updated ${returnedPerson.name}`, 'success')
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            // STEP 12: ERROR HANDLING
            showNotification(
              `Information of ${newName} has already been removed from server`, 
              'error'
            )
            // Sync local state by removing the person who no longer exists on server
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      showNotification(`Added ${returnedPerson.name}`, 'success')
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`Deleted ${name}`, 'success')
      })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName} onNameChange={(e) => setNewName(e.target.value)}
        numValue={newNumber} onNumChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App