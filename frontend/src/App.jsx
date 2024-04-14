import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import MyCart from './pages/MyCart';
import Mens from './pages/Mens';
import Womens from './pages/Womens';
import Kids from './pages/Kids';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AppLayout />}
        >
          <Route
            path="/"
            element={<MainLayout />}
          >
            <Route index element={<HomePage/>} />
            <Route path='login' element={<Login/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="cart" element={<MyCart />} />
            <Route path="mens" element={<Mens />} />
            <Route path="womens" element={<Womens />} />
            <Route path="kids" element={<Kids />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
          </Route>
          <Route path="*" element={<NotFound to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;