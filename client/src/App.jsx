
import { Provider } from 'react-redux';           //es para leer la tineda 
import generateStore from './store';
import {Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Shop from './components/Shop';


function App() {
 
  const store = generateStore()
  return (
    <Provider store={store}>   
      <Routes> 
        <Route path="/" element={<Home />} />   
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
      </Routes> 
    </Provider>
    
  );
}
export default App;
