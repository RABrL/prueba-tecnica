export default function Aside ({ callback }) {
  const handleClick = (e) => {
    callback()
  }
  return (
    <aside>
      <div className="top">
        <img src="" alt="" />
        <h2>Admin</h2>
      </div>
      <nav className="sidebar">
        <a href="#" className="home active" onClick={handleClick}>
          <i className="fa-solid fa-house"></i>
          <h3>Home</h3>
        </a>
        <a href="#" className="clients" onClick={handleClick}>
          <i className="fa-solid fa-user"></i>
          <h3>Clients</h3>
        </a>
        <a href="#" className="credits" onClick={handleClick}>
          <i className="fa-solid fa-credit-card"></i>
          <h3>Credits</h3>
        </a>
        <a href="#" className="">
          <i className="fa-solid fa-right-from-bracket"></i>
          <h3>Logout</h3>
        </a>
      </nav>
    </aside>
  )
}
