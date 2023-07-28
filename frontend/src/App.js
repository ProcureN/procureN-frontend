import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Admin from './components/Dashboard/Admin/Admin';

import Login from './Pages/Login';
import Main from './Pages/Main';

import Singup from './Pages/Singup';
import UserDashboard from './components/Dashboard/User/UserDashboard';
import ManufacturerDashboard from './components/Dashboard/Manufacturer/ManufacturerDashboard';
import './App.css';
import RestPassword from './Pages/RestPassword';
import OtpSignup from './Pages/OtpSignup';
import OtpRestPass from './Pages/OtpRestPass';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <div>
        <Link className='underline underline-offset-2 text-blue-700' to='/'>Back to site &larr;</Link>{' '}
      </div>

    </div>
  );
};

function App() {
  return (
    <div className='scroll-smooth '>
      <Router>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Singup />} />
          <Route exact path='/resetpass' element={<RestPassword />} />
          <Route exact path={`/otpsign`} element={<OtpSignup />} />
          <Route exact path={`/otplogin`} element={<OtpRestPass />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/Client' element={<UserDashboard />} />
          <Route exact path='/Vendor' element={<ManufacturerDashboard />} />
          <Route exact path='/*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
