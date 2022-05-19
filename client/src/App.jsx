
import { Provider } from 'react-redux';           //es para leer la tineda 
import generateStore from './store';
import {Route, Routes} from "react-router-dom";
import Inicio from './components/Inicio';

import "./App.css"

function App() {
 
  const store = generateStore()
  return (
    <Provider store={store}>   
      <Routes> 
        <Route path="/" element={<Inicio/>}/>    
      </Routes> 
    </Provider>
    
  );
}
export default App;
