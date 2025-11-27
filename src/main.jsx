import React from 'react';
import './firebase.js';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import App from './App';
import './index.css';
import './Collection.css';
import './Homepage.css';


import { getApps, getApp } from 'firebase/app';

console.log('Firebase apps:', getApps().length);
if (!getApps().length) {
  console.error('⚠️ Firebase did not initialize!');
} else {
  console.log('✅ Firebase initialized:', getApp().name);
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
