import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Navbar from './components/Navbar';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

