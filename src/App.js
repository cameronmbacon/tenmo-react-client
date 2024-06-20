import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className='app-container'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      <a className='attribution' href="https://www.vecteezy.com/free-videos/receiving-money">Receiving Money Stock Videos by Vecteezy</a>
    </div>
  );
}

export default App;
