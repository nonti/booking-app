import React from 'react';
import Header from './components/header/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;