import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import SignUp from "./pages/SignUP";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VehiculePage from './pages/VehiculePage';
import Footer from './share/Footer'
import { VehiculeProvider } from './context/VehiculeContext';
import { DistrictProvider } from './context/DistrictContext';
import { BonCarburantProvider } from './context/BonCarburantContext';
import { CompteUserProvider } from './context/CompteUserContext';
import { UserPageProvider } from './context/UserPageContext';
import { ReçuCarburantProvider } from './context/ReçuCarburantContext';
import { Stat1Provider } from './context/Stat1Context';
import DistrictPage from './pages/DistrictPage' 
import Dashboard from './pages/Dashboard';
import BonCarburant from './pages/BonCarburant';
import CompteUser from './pages/CompteUser'
import UserPage from './pages/UserPage'
import ReçuCarburant from './pages/ReçuCarburant'
import Stat1 from './pages/Stat1';
import { LoginProvider } from './context/LoginContext';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <LoginProvider>
          <CompteUserProvider>
            <VehiculeProvider>
              <DistrictProvider>
                <BonCarburantProvider>
                  <CompteUserProvider>
                    <UserPageProvider>
                      <ReçuCarburantProvider>
                        <Stat1Provider>
                          <div className="backgroundcolor1">
                            <main className='container mx-auto px-3 pb-12'>
                              <Routes>
                                <Route path="/SignUp" element={<SignUp />} />
                                <Route path="/Login" element={<Login />} />
                                <Route path="/" element={<Home />} />  
                                <Route path="/vehicules" element={<VehiculePage />} />
                                <Route path="/districts" element={<DistrictPage />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/bon_carburant" element={<BonCarburant />} />
                                <Route path="/compte_userpage" element={<CompteUser />} />
                                <Route path="/userpage" element={<UserPage />} />
                                <Route path="/reçu_carburant" element={<ReçuCarburant />} />
                                <Route path="/stat1" element={<Stat1 />} />
                              </Routes>
                            </main>
                            <Footer />
                          </div>
                        </Stat1Provider>
                      </ReçuCarburantProvider>
                    </UserPageProvider>
                  </CompteUserProvider>
                </BonCarburantProvider>
              </DistrictProvider>
            </VehiculeProvider>
          </CompteUserProvider>
        </LoginProvider>
      </Router>
    </ChakraProvider>
  )
}

export default App
