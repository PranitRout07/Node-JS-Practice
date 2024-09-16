import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SpeechR from './components/Speech'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <div className='text-center bg-slate-400 p-4'>
      <SpeechR/>
    </div>
    <Footer/>
    </>
  )
}

export default App
