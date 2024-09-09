import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [data,setData] = useState([])
  useEffect(()=>{
    axios.get('/api/data')
    .then((response)=>{setData(response.data)

    })
    .catch((error)=>{
      console.log(error)
    })
  })


  return (
    <>
      <div>
        {data.map((val)=>(
          <div key={val.Roll}>
            <h3>Name:- {val.Name}</h3>
            <h3>Age:- {val.Age}</h3>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
