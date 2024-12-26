import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Main from './components/Mainn'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      {/* <div className='h-[calc(100vh-76px)]'> */}
        <Main />
      {/* </div> */}
      <Footer />
    </>
  )
}

export default App
