import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from "./components/Dashboard"
import Add from './components/Addproduct'
import ProductList from './components/ProductList'
import { Testfilter } from './components/Func'
import { FilterModal } from './components/Func'


function App() {


  return (
    <>
    {/* <FilterModal /> */}
    {/* <Testfilter /> */}
     <Navbar>
    <Dashboard/>
    </Navbar> 
    </>
  )
}

export default App
