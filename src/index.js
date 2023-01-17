import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Card from './components/card';
import Register from './pages/register';
import Product from './pages/product';
import Login from './pages/login';
import ProductDetail from './pages/productDetail'
import HomeAdmin from './pages/admin/homeAdmin';
import Buy from './pages/buy'
const root = ReactDOM.createRoot(document.getElementById('root'));
// const isAdmin= localStorage.getItem("isAdmin")
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<HomeAdmin />} />
        <Route path="register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="buy/:productId" element={<Buy />} />
      


        
            

       



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
