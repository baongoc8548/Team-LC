import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Card from './components/card';
import Product from './pages/product';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        {/* <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="buy/:productId" element={<Buy />} />
        <Route path="/myCarts" element={<MyCarts />} />
        <Route path="/myHistory" element={<MyHistory />} />
        <Route path="/*" element={<PageNotFound />} />

        {
          isAdmin==="true" &&
        <Route path="/orders" element={<Orders />} />
        } */}



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
