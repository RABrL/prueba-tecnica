const $ = selector => document.querySelector(selector)
const title = $('.title')
const clients = $('.clients')
const home = $('.home')
const credits = $('.credits')
const container = $('.data')
const modalContent = $('.form-content')

document.addEventListener('DOMContentLoaded', async () => {
  renderHome()
  loadButtonsModal()
})

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
                            <div class='right'>
                              <i class="fa-solid fa-credit-card"></i>
                            </div>
                          </div>
                          <div class='clients'>
                            <div class='left'>
                              <h3>Number of Clients</h3>
                              <span>${numberOfClients}</span>
                            </div>
                            <div class='right'>
                              <i class="fa-solid fa-user"></i>
                            </div>
                          </div>
                        </div>`
  container.innerHTML = homeData
}

clients.addEventListener('click', async () => {
  title.innerText = 'Clients'
  cleanData(container)
  const tabla = `
  <div class='button-box' >
    <button class='openModal' onclick=${createClientModal()}>Create User</button>
  </div>
  <table>
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
  await fetch('http://localhost:3000/api/clients')
    .then(res => res.json())
    .then(data => {
      if (data.body.length === 0) throw new Error()
      const container = $('.data tbody')
      data.body.forEach(client => {
        const { name, lastName, dni, address, city, phone, currentCredit } = client
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
                        <td class="actions">
                          <i class="fa-solid fa-pen-to-square edit openModal"></i>
                          <i class="fa-solid fa-trash delete"></i>
                        </td>
                    </tr>`
        container.innerHTML += str
      })
    })
    .catch(e => {
      console.log(e)
      $('.data tbody').innerHTML = '<p class="text-muted">No hay clientes</p>'
    })
  loadButtonsModal()
})

credits.addEventListener('click', () => {
  title.innerHTML = 'Credits'
  cleanData(container)
})

function cleanData (container) {
  container.innerHTML = ''
}

function loadButtonsModal () {
  const btns = document.querySelectorAll('.openModal')
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      cleanData(modalContent)
      modal.style.display = 'block'
    })
  })
}

/*  MODAL */
const modal = $('#myModal')
const btnClose = $('.modal-content i')

btnClose.addEventListener('click', () => {
  modal.style.display = 'none'
})

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none'
  }
})

function createClientModal () {
  $('.modal-title').innerText = 'Create Client'
  const modalHtml = `
  <form action="http://localhost:3000/api/clients" method="POST">
        <div class="left">
          <div>
            <div class="input-box">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Your Name">
            </div>
            <div class="input-box">
              <label for="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" placeholder="Your Name">
            </div>
          </div>
          <div>
            <div class="input-box">
              <label for="dni">DNI:</label>
              <input type="text" id="dni" name="dni" placeholder="Your DNI">
            </div>
            <div class="input-box">
              <label for="address">Address:</label>
              <input type="text" id="address" name="address" placeholder="Your Address">
            </div>
          </div>
          <div>
            <div class="input-box">
              <label for="city">City:</label>
              <input type="search" list="cities" name="city" placeholder="Your City">
              <datalist id="cities">
                <option value="Bucaramanga"></option>
              </datalist>
            </div>
            <div class="input-box">
              <label for="phone">Phone:</label>
              <input type="tel" id="phone"name="phone" placeholder="Your Phone Number"> 
            </div>
          </div>
          <div>
            <div class="input-box">
              <label for="status">Status:</label>
              <select id="status" id="credit-status" name="status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <input type="submit" class="save" value="Save Changes">
        </div>
        <div class="right">
          <div class="input-box">
            <label for="limitCredit">Limit Credit:</label>
            <input type="number" id="limitCredit" name="limitCredit" placeholder="Your Limit Credit">
          </div>
          <div class="input-box">
            <label for="curerntCredit">Current Credit:</label>
            <input type="number" id="curentCredit" name="currentCredit" placeholder="Your Current Credit">
          </div>
          <div class="input-box">
            <label for="daysGrace">Days of Grace:</label>
            <input type="number" id="daysGrace" name="daysGrace" placeholder="Your Days of grace">
          </div>
        </div>
      </form>
  `
  modalContent.innerHTML = modalHtml
}
