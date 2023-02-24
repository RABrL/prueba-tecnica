export default function renderClients (container, data) {
  const tabla = `
  <div class='button-box' >
    <button class='openModal create'>Create User</button>
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
  const dataContainer = document.querySelector('.data tbody')
  data.body.forEach(client => {
    const { _id, name, lastName, dni, address, city, phone, currentCredit } = client
    const status = true
    const str = `
    <tr>
      <td>${name}</td>
      <td>${lastName}</td>
      <td>${dni}</td>
      <td>${address}</td>
      <td>${city}</td>
      <td>${phone}</td>
      <td>${currentCredit}</td>
      <td class=${status ? 'success' : 'danger'}>Active</td>
      <td class="actions">
        <button class='openModal edit' value=${_id}><i class="fa-solid fa-pen-to-square"></i></button>
        <button class='delete' value=${_id}><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`
    dataContainer.innerHTML += str
  })
}
