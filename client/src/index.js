import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react'

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain='ivocfh.us.auth0.com'
        clientId='geDq1VgcaFAidcaejuAGEFyZxeF3qDuD'
        redirectUri='http://localhost:3000/Shop'
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

