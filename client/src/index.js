import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const redirectLogin = process.env.REACT_HOST || 'http://localhost:3000';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain='ivocfh.us.auth0.com'
        clientId='geDq1VgcaFAidcaejuAGEFyZxeF3qDuD'
        redirectUri={`${redirectLogin}/Shop`}
        audience='https://ivocfh.us.auth0.com/api/v2/'
        // audience='https://www.bluebirds.api.com'
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);



