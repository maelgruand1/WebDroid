// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Créer la racine React
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Monter l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// Performance Web Vitals
reportWebVitals();
