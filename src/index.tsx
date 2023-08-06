import React from 'react';
//@ts-ignore
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    {/* <div>
      header
    </div> */}

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

