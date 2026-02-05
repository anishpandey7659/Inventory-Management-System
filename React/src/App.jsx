import BillingPage from "./components/Billingpage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import InventoryPage from './components/Inventory'  
import Dashboard from './components/Dashboard'  
import Reports from './components/Report'
import BillingHistory from './components/Billinghistory'
import ProfilePage from "./components/Profile";
import HomePage from "./components/Homepage";
import Authprovider from "./Authprovider";
import Privateroute from "./components/Privateroute";
import SuppliersManagement from "./components/Suppliers management";
import CompanyAccountForm from "./components/Subpage/CompanyAccountForm";
import UserManagement from "./components/UserManagement";

function App() {
  return (
    <>

      <Authprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/"element={<HomePage/>}/>
              <Route path="/company-form"element={<CompanyAccountForm/>}/>
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
              <Route path="/suppliers" element={<SuppliersManagement />} />
              <Route path="/user-management" element={<UserManagement />} />
            </Route>
          

        </Routes>
      </BrowserRouter>
    </Authprovider>
    
    </>
  );
}


export default App;

