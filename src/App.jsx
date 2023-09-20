import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/admin/registration/log_in'
import UserLogin from './components/user/login'
import UserDetails from './components/user/userDetails';
import MainPage from './components/user/user'
import Admin from './components/admin'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import AdminSignUp from './components/admin/registration/sign_up';

function App() {
  return (
    <>
    <ToastContainer newestOnTop={false} autoClose={1000} />
    <Routes>
      <Route path='*' element={<Admin />} />
      <Route path="/admin_register" element={<AdminSignUp />} />
      <Route path="/user_login" element={<UserLogin />} />
      <Route path='/user/:id' element={<UserDetails />} />
      <Route path="/user" element={<MainPage />} />
      <Route path="/" element={<Login />} />
    </Routes>
    </>
  )
}

export default App
