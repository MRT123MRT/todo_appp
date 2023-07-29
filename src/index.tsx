import React from 'react';
//@ts-ignore
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <div>
      header
    </div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<>PRODUCTS</>} />
        <Route path="/about" element={<>HELLO YOUR COMPUTER HAS VIRUS</>} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

