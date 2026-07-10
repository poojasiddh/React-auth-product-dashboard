import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
import VendorForm from './Pages/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Pages/Login';
import Dashboard from './Pages/Dashboard'
import ProtectedRoute from './Component/ProtectedRoute'
import Cart from './Pages/Cart';
import View from './Pages/View';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path="/registration" element={<VendorForm />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;
