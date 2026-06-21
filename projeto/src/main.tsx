import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './assets/svgs';
import Home from './pages/Home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);