import { useState } from 'react'
import './App.css'
import Aside from './components/Aside'
import { Header } from './components/Header'
import { Modal } from './components/Modal'

function App () {
  const [view, setView] = useState('Home')
  return (
    <>
      <Aside callback={setView}/>
      <main>
        <Header>{view}</Header>
      </main>
      <Modal></Modal>
    </>
  )
}

export default App
