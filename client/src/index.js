import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';

const environment = 'dev'; // dev | prod
let reactHost = '';

if (environment === 'prod') {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  reactHost = 'https://bluebirdstore.vercel.app';
}
if (environment === 'dev') {
  axios.defaults.baseURL = 'http://localhost:3001';
  reactHost = 'http://localhost:3000';
}

// axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain='ivocfh.us.auth0.com'
        clientId='geDq1VgcaFAidcaejuAGEFyZxeF3qDuD'
        redirectUri={`${reactHost}/Shop`}
        audience='https://ivocfh.us.auth0.com/api/v2/'
        // audience='https://www.bluebirds.api.com'
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);



