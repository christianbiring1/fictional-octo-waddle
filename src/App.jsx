import { Routes, Route } from 'react-router-dom'
import MainPage from './components/user'
import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/voting_app" element={<MainPage />} />
    </Routes>
    </>
  )
}

export default App
