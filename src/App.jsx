import { Routes, Route } from 'react-router-dom'
import Login from './components/admin/registration/log_in'
// import SideBar from './components/admin/sidebar'
import UserLogin from './components/user/login'
import MainPage from './components/user/user'
import Admin from './components/admin'
import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path='*' element={<Admin />} />
      <Route path="/admin_login" element={<Login />} />
      <Route path="/user_login" element={<UserLogin />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
    </>
  )
}

export default App
