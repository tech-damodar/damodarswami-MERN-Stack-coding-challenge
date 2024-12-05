import { useEffect,useState } from 'react'
import Navbar from './Navbar'
import './App.css'
import Home from './Home'
import TransactionsBar from './TransactionsBar'
import Statistics from './Statistics'
import PiecahrtCom from './PiecahrtCom'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
  let init = fetch("http://localhost:3000/api/initialize'");
},[])
  return (
    <>

      
      {/* <Home/> */}
    {/* <TransactionsBar/> */}
    {/* <Statistics/> */}
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/tractionBar' element={<TransactionsBar/>}/>
      <Route path='/statistic' element={<Statistics/>}></Route>
      <Route path='/pie' element={<PiecahrtCom/>} ></Route>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
