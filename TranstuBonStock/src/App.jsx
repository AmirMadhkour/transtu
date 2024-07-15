import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUP";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BusPage from "./pages/BusPage";
import TypedeBon from "./pages/TypedeBon"

import { ChakraProvider } from '@chakra-ui/react'



function App()  {

  return (
    <ChakraProvider>
    <div className='backgroundcolor'>
    
    <Router>
      <Routes>
        <Route path="/SignUp" element={ <SignUp/>} />
        <Route path="/Login" element={ <Login/>} />
        <Route path="/" element={ <Home/>} />
        <Route path="/type_de_bon" element={ <TypedeBon/>} />
        <Route path="/bus" element={<BusPage />} />
      </Routes>
    </Router>
  </div>
</ChakraProvider>
  )
}

export default App


