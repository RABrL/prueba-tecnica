export default function Aside () {
  return (
    <aside>
      <div class="top">
        <img src="" alt=""/>
        <h2>Admin</h2>
      </div>
      <nav class="sidebar">
        <a href="#" class="home active">
          <i class="fa-solid fa-house"></i>
          <h3>Home</h3>
        </a>
        <a href="#" class="clients">
          <i class="fa-solid fa-user"></i>
          <h3>Clients</h3>
        </a>
        <a href="#" class="credits">
          <i class="fa-solid fa-credit-card"></i>
          <h3>Credits</h3>
        </a>
        <a href="#" class="">
          <i class="fa-solid fa-right-from-bracket"></i>
          <h3>Logout</h3>
        </a>
      </nav>
    </aside>
  )
}
