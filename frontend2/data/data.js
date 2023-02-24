import { URL_CLIENTS, URL_CREDITS } from '../app.js'
import Client from '../models/Client.js'

export function getClient (listClients, id) {
  return listClients.find(client => client.id === id)
}

export function getAllClients () {
  return fetch(URL_CLIENTS)
    .then(res => res.json())
    .then(data => {
      return data.body.map(client => {
        const { _id: id, name, lastName, dni, address, city, phone, limitCredit, currentCredit, status } = client
        return new Client(id, name, lastName, dni, address, city, phone, limitCredit, currentCredit, status)
      })
    })
}

export function getCredit (id) {
  return fetch(`${URL_CREDITS}/${id}`)
    .then(res => res.json())
    .then(data => data)
}

export function getAllCredits () {
  return fetch(URL_CREDITS)
    .then(res => res.json())
    .then(data => data)
}
