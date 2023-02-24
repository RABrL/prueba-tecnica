import { Form } from './Form'

export function Modal () {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <i className="fa-solid fa-xmark close"></i>
        <h2 className="modal-title"></h2>
        <div className="form-content">
          <Form></Form>
        </div>
      </div>
    </div>
  )
}
