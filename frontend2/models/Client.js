export default class Client {
  actions
  constructor (id, name, lastName, dni, address, city, phone, limitCredit, currentCredit, status) {
    this.id = id
    this.name = name
    this.lastName = lastName
    this.dni = dni
    this.address = address
    this.city = city
    this.phone = phone
    this.limitCredit = limitCredit
    this.currentCredit = currentCredit
    this.status = status
    this.actions = `<td class="actions">
                      <button class='openModal edit' value=${id}><i class="fa-solid fa-pen-to-square"></i></button>
                      <button class='delete' value=${id}><i class="fa-solid fa-trash"></i></button>
                    </td>`
  }

}
