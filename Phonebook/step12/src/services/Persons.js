// src/services/persons.js
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons' // Update this!

const getAll = () => axios.get(baseUrl).then(r => r.data)
const create = (newObject) => axios.post(baseUrl, newObject).then(r => r.data)
const remove = (id) => axios.delete(`${baseUrl}/${id}`).then(r => r.data)
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(r => r.data)

export default { getAll, create, remove, update }
