import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'

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

