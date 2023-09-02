import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/admin/registration/log_in'
// import SideBar from './components/admin/sidebar'
import UserLogin from './components/user/login'
import MainPage from './components/user/user'
import Admin from './components/admin'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  return (
    <>
    <ToastContainer newestOnTop={false} />
    <Routes>
      <Route path='*' element={<Admin />} />
      <Route path="/admin_login" element={<Login />} />
      <Route path="/user_login" element={<UserLogin />} />
      <Route path="/user" element={<MainPage />} />
    </Routes>
    </>
  )
}

export default App
