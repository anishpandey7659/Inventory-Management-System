import { useState } from 'react'
import Add from './components/Addproduct'
import ProductList from './components/ProductList'
import { FilterModal } from './components/Func'
import BillingPage from './components/Billingpage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import InventoryPage from './components/Inventory'  
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'
import Reports from './components/Report'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InventoryPage />} />
          <Route path="Inventory" element={<InventoryPage />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="report" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

