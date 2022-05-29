import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import dotenv from 'dotenv';
dotenv.config();
import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

