import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { GameDetailsPage } from './pages/GameDetailsPage/GameDetailsPage';
import { CartPage } from './pages/CartPage/CartPage'; 
import { Footer } from './components/layout/Footer/Footer';
import { ToastContainer } from './components/common/Toast/ToastContainer'; 
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GameDetailsPage />} />
            <Route path="/cart" element={<CartPage />} /> 
          </Routes>
        </main>
        <Footer />
        <ToastContainer /> 
      </div>
    </BrowserRouter>
  );
};

export default App;