import axios from 'axios'

/**
 * RELATIVE URL EXPLANATION:
 * Using '/api/persons' instead of 'http://localhost:3001/api/persons' 
 * allows the frontend to automatically point to the same server that 
 * is hosting the files. This works on both localhost and Render.
 */
const baseUrl = '/api/persons' 

// Fetches all entries
const getAll = () => axios.get(baseUrl).then(r => r.data)

// Sends a new entry to the server
const create = (newObject) => axios.post(baseUrl, newObject).then(r => r.data)

// Deletes a specific entry by ID
const remove = (id) => axios.delete(`${baseUrl}/${id}`).then(r => r.data)

// Updates an existing entry (used for changing numbers)
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(r => r.data)

export default { getAll, create, remove, update }