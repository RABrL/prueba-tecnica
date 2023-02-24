import renderClient from './components/renderClient.js'

const $ = selector => document.querySelector(selector)
const title = $('.title')
const clients = $('.clients')
const home = $('.home')
const credits = $('.credits')
const container = $('.data')
const formConteiner = $('.form-content')

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
  const data = await fetch('http://localhost:3000/api/clients')
    .then(res => res.json())
    .then(data => {
      if (data.body.length === 0) throw new Error()
      return data
    }).catch(e => {
      console.log(e)
      $('.data tbody').innerHTML = '<p class="text-muted">No hay clientes</p>'
    })
  renderClient(container, data)
  $('button.openModal').addEventListener('click', () => {
    modal.style.display = 'block'
    createFormModal('create')
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
  const btns = document.querySelectorAll('.edit.openModal')
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'block'
      createFormModal('update')
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

function createFormModal (type) {
  console.log(type)
  cleanData(formConteiner)
  $('.modal-title').innerText = `${type.toUpperCase()}`
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
            ${type === 'create'
              ? `
                <div class="input-box">
                  <label for="status">Status:</label>
                  <select id="status" id="credit-status" name="status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              `
              : `
              <div class="input-box">
                <label for="contact">Contact:</label>
                <input type='text' id='contact' name='contact' placeholder='Some Contact'>
              </div>
              `}
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
  formConteiner.innerHTML = modalHtml
}
