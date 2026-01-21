import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from "./components/Dashboard"
import Add from './components/Addproduct'
import ProductList from './components/ProductList'
import { FilterModal } from './components/Func'
import BillingPage from './components/Billingpage'


function App() {


  return (
    <>
    {/* <FilterModal /> */}
    {/* <Testfilter /> */}
       <Navbar>
    {/* <Dashboard/> */}
    <BillingPage />
    </Navbar>  
    </>
  )
}

export default App
