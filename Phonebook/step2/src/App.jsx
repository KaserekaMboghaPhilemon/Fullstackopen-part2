import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  // handle input change
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // handle form submit
  const addPerson = (event) => {
    event.preventDefault()

    //  check if name already exists
    const nameExists = persons.some(
      person => person.name === newName
    )

    if (nameExists) {
      alert(`${newName} is already added to your phonebook`)
      return
    }

    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {persons.map((person, index) =>
        <p key={index}>{person.name}</p>
      )}
    </div>
  )
}

export default App