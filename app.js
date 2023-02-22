const $ = selector => document.querySelector(selector)
const title = $('.title')
const clients = $('.clients')
const home = $('.home')
const credits = $('.credits')
const container = $('.data')

document.addEventListener('DOMContentLoaded', async () => renderHome())

home.addEventListener('click', async () => renderHome())

async function renderHome () {
  title.innerHTML = 'Home'
  cleanData(container)
  const numberOfClients = await fetch('http://localhost:3000/api/clients')
    .then(res => res.json())
    .then(data => data.body.length)
  const numberOfCredits = await fetch('http://localhost:3000/api/credits')
    .then(res => res.json())
    .then(data => data.body.length)
  const homeData = `<div class='home-data'>
                          <div class='credits'>
                            <div class='left'>
                              <h3>Number of Credits</h3>
                              <span>${numberOfCredits}</span>
                            </div>
                            <div class='rigth'>
                              <i class="fa-solid fa-credit-card"></i>
                            </div>
                          </div>
                          <div class='credits'>
                            <div class='right'>
                              <h3>Number of Clients</h3>
                              <span>${numberOfClients}</span>
                            </div>
                            <div class='rigth'>
                              <i class="fa-solid fa-credit-card"></i>
                            </div>
                          </div>
                        </div>`
  container.innerHTML = homeData
}

clients.addEventListener('click', () => {
  title.innerText = 'Clients'
  cleanData(container)
  const tabla = `<table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>NIT/CC</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Phone</th>
                      <th>Available quota</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="body">
                  </tbody>
                </table>
                <a href="#">Show All</a>`
  container.innerHTML = tabla
  fetch('http://localhost:3000/api/clients')
    .then(res => res.json())
    .then(data => {
      if (data.body.length === 0) throw new Error()
      const container = $('.data tbody')
      data.body.forEach(client => {
        const { name, lastName, dni, address, city, phone, limitCredit, currentCredit } = client
        const status = true
        const str = `<tr>
                        <td>${name}</td>
                        <td>${lastName}</td>
                        <td>${dni}</td>
                        <td>${address}</td>
                        <td>${city}</td>
                        <td>${phone}</td>
                        <td>${currentCredit}</td>
                        <td class=${status ? 'success' : 'danger'}>Active</td>
                    </tr>`
        container.innerHTML += str
      })
    })
    .catch(e => {
      console.log(e)
      $('.data tbody').innerHTML = '<p class="text-muted">No hay clientes</p>'
    })
})

credits.addEventListener('click', () => {
  title.innerHTML = 'Credits'
  cleanData(container)
})

function cleanData (container) {
  container.innerHTML = ''
}
