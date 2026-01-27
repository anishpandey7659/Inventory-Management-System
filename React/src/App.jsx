import BillingPage from "./components/Billingpage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import InventoryPage from './components/Inventory'  
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'
import Reports from './components/Report'
import BillingHistory from './components/Billinghistory'
import ProfilePage from "./components/Profile";
import HomePage from "./components/Homepage";
import Authprovider from "./Authprovider";
import Privateroute from "./components/Privateroute";


function App() {
  return (
    <>

      <Authprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/"element={<HomePage/>}/>

            <Route element={
              <Privateroute>
                <Layout />
              </Privateroute>
            }>
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/profile-page" element={<ProfilePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/report" element={<Reports />} />
              <Route path="/billinghistory" element={<BillingHistory />} />
            </Route>
          

        </Routes>
      </BrowserRouter>
    </Authprovider>
    
    </>
  );
}


export default App;

