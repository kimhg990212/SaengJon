import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ServiceIntro from './pages/ServiceIntro'
import Diagnose from './pages/Diagnose'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/service" element={<ServiceIntro />} />
        <Route path="/diagnose" element={<Diagnose />} />
      </Routes>
    </BrowserRouter>
  )
}