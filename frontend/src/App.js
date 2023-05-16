import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Dashboard/Admin/Admin';

import Login from './Pages/Login';
import Main from './Pages/Main';
import Otp from './Pages/Otp';
import Singup from './Pages/Singup';
import UserDashboard from './components/Dashboard/User/UserDashboard';
import ManufacturerDashboard from './components/Dashboard/Manufacturer/ManufacturerDashboard';
import "./App.css"
import RestPassword from './Pages/RestPassword';
import OtpSignup from './Pages/OtpSignup';



function App() {
  return (
    <div className='scroll-smooth'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Singup />} />
          <Route exact path='/resetpass/:email' element={<RestPassword />} />
          <Route exact path={`/otp/:path`} element={<Otp />} />
          <Route exact path={`/otpsign`} element={<OtpSignup />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/Retailer' element={<UserDashboard />} />
          <Route exact path='/manufacturer' element={<ManufacturerDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
