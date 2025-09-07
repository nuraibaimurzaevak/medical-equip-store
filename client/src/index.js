// src/index.js
/*import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { BrowserRouter } from 'react-router-dom'; // ← добавить

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
