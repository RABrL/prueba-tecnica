import renderClients from './components/clients.js'
import formModal from './components/formModal.js'
import { getClient } from './data/data.js'

export const URL_CLIENTS = 'http://localhost:3000/api/clients'
export const URL_CREDITS = 'http://localhost:3000/api/credits'
export const $ = selector => document.querySelector(selector)
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
  const numberOfClients = await fetch(URL_CLIENTS)
    .then(res => res.json())
    .then(data => data.body.length)
  const numberOfCredits = await fetch(URL_CREDITS)
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
  const data = await fetch(URL_CLIENTS)
    .then(res => res.json())
    .then(data => {
      if (data.body.length === 0) throw new Error()
      return data
    }).catch(e => {
      document.querySelector('.data tbody').innerHTML = '<p class="text-muted">No hay clientes</p>'
    })
  renderClients(container, data)
  loadButtonsModal()
  $('.create').addEventListener('click', (e) => {
    modal.style.display = 'block'
    formModal(formConteiner, 'create')
  })
  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      await fetch(URL_CLIENTS + `/${btn.value}`, { method: 'DELETE' })
    })
  })
})

credits.addEventListener('click', () => {
  title.innerHTML = 'Credits'
  cleanData(container)
})

export function cleanData (container) {
  container.innerHTML = ''
}

function loadButtonsModal () {
  const btns = document.querySelectorAll('.openModal.edit')
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'block'
      formModal(formConteiner, 'update', btn.value)
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
