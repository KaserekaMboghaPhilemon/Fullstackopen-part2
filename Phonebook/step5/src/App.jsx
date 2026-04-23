import { useState } from 'react'

// 1. Filter Component
const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
)

// 2. PersonForm Component
const PersonForm = ({ onSubmit, nameValue, onNameChange, numValue, onNumChange }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={nameValue} onChange={onNameChange} /></div>
    <div>number: <input value={numValue} onChange={onNumChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

// 3. Persons Component
const Persons = ({ personsToShow }) => (
  <div>
    {personsToShow.map(person => (
      <p key={person.id}>{person.name} {person.number}</p>
    ))}
  </div>
)

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
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to your phonebook`)
      return
    }
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